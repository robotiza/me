import { CronDate } from "../date";
import constraints from "../fields/contraints";
import { FIELD_LAST, FieldItems, FieldValues, ReadonlyCronFields } from "../fields/fieldset";
import { DAYS_IN_MONTH } from "../month";
import applyTimezoneShift, { DstRange, fnName } from "./applyTimezoneShift";

/**
 * Cron iteration loop safety limit
 */
const LOOP_LIMIT = 10000;

/**
 * Helper function that checks if 'L' is in the array
 *
 * @param {Array} expressions
 */
const isLInExpressions = (expressions: FieldItems) => {
    return expressions.length > 0 && expressions.some(expression => {
        return typeof expression === 'string' && expression.indexOf(FIELD_LAST) >= 0;
    });
};

const isLastWeekdayOfMonthMatch = (currentDate: CronDate, expressions: FieldItems) => {
    return expressions.some(expression => {
        // There might be multiple expressions and not all of them will contain
        // the "L".
        if (!isLInExpressions([expression] as FieldItems)) {
            return false;
        }

        // The first character represents the weekday
        const weekday = Number.parseInt(expression[0]) % 7;

        if (Number.isNaN(weekday)) {
            throw new Error('Invalid last weekday of the month expression: ' + expression);
        }

        return currentDate.getDay() === weekday && currentDate.isLastWeekdayOfMonth();
    });
};
/**
 * Helps determine if the provided date is the correct nth occurence of the
 * desired day of week.
 *
 * @param {CronDate} date
 * @param {Number} nthDayOfWeek
 * @return {Boolean}
 * @private
 */
const isNthDayMatch = (date: { getDate: () => number; }, nthDayOfWeek: number): boolean => {
    if (nthDayOfWeek < 6) {
        if (
            date.getDate() < 8 &&
            nthDayOfWeek === 1 // First occurence has to happen in first 7 days of the month
        ) {
            return true;
        }

        const offset = date.getDate() % 7 ? 1 : 0; // Math is off by 1 when dayOfWeek isn't divisible by 7
        const adjustedDate = date.getDate() - (date.getDate() % 7); // find the first occurance
        const occurrence = Math.floor(adjustedDate / 7) + offset;

        return occurrence === nthDayOfWeek;
    }

    return false;
};

/**
 * Match field value
 *
 * @param {String} value
 * @param {Array} sequence
 * @return {Boolean}
 * @private
 */
const matchSchedule = (value: number, sequence: FieldValues): boolean => {
    for (let i = 0, c = sequence.length; i < c; i++) {
        if (sequence[i] >= value) {
            return sequence[i] === value;
        }
    }

    return sequence[0] === value;
}

export interface ScheduleState {
    currentDate: CronDate;
    dst?: DstRange;
    endDate?: CronDate;
    hasIterated: boolean;
    nthDayOfWeek: number;
    startDate?: CronDate;
    tz?: string;
}

/**
 * Find next or previous matching schedule date
 *
 * @return {CronDate}
 * @private
 */
const findSchedule = (
    fields: ReadonlyCronFields,
    state: ScheduleState,
    reverse?: boolean
): ScheduleState => {
    // Whether to use backwards directionality when searching
    reverse = reverse || false;
    const dateMathVerb = reverse ? 'subtract' : 'add';

    const currentDate = new CronDate(state.currentDate, state.tz);
    const dst = { ...state.dst };

    // Find matching schedule
    const startTimestamp = currentDate.getTime();
    let stepCount = 0;

    while (stepCount < LOOP_LIMIT) {
        stepCount++;

        // Validate timespan
        if (reverse) {
            if (state.startDate && (currentDate.getTime() - state.startDate.getTime() < 0)) {
                throw new Error('Out of the timespan range');
            }
        } else {
            if (state.endDate && (state.endDate.getTime() - currentDate.getTime()) < 0) {
                throw new Error('Out of the timespan range');
            }
        }

        // Day of month and week matching:
        //
        // "The day of a command's execution can be specified by two fields --
        // day of month, and day of week.  If  both	 fields	 are  restricted  (ie,
        // aren't  *),  the command will be run when either field matches the cur-
        // rent time.  For example, "30 4 1,15 * 5" would cause a command to be
        // run at 4:30 am on the  1st and 15th of each month, plus every Friday."
        //
        // http://unixhelp.ed.ac.uk/CGI/man-cgi?crontab+5
        //

        let dayOfMonthMatch = matchSchedule(currentDate.getDate(), fields.dayOfMonth);
        if (isLInExpressions(fields.dayOfMonth)) {
            dayOfMonthMatch = dayOfMonthMatch || currentDate.isLastDayOfMonth();
        }
        let dayOfWeekMatch = matchSchedule(currentDate.getDay(), fields.dayOfWeek);
        if (isLInExpressions(fields.dayOfWeek)) {
            dayOfWeekMatch = dayOfWeekMatch || isLastWeekdayOfMonthMatch(currentDate, fields.dayOfWeek);
        }
        const isDayOfMonthWildcardMatch = fields.dayOfMonth.length >= DAYS_IN_MONTH[currentDate.getMonth()];
        const isDayOfWeekWildcardMatch = fields.dayOfWeek.length === constraints[5].max - constraints[5].min + 1;
        const currentHour = currentDate.getHours();

        // Add or subtract day if select day not match with month (according to calendar)
        if (!dayOfMonthMatch && (!dayOfWeekMatch || isDayOfWeekWildcardMatch)) {
            applyTimezoneShift(fields, dst, currentDate, dateMathVerb, 'Day');
            continue;
        }

        // Add or subtract day if not day of month is set (and no match) and day of week is wildcard
        if (!isDayOfMonthWildcardMatch && isDayOfWeekWildcardMatch && !dayOfMonthMatch) {
            applyTimezoneShift(fields, dst, currentDate, dateMathVerb, 'Day');
            continue;
        }

        // Add or subtract day if not day of week is set (and no match) and day of month is wildcard
        if (isDayOfMonthWildcardMatch && !isDayOfWeekWildcardMatch && !dayOfWeekMatch) {
            applyTimezoneShift(fields, dst, currentDate, dateMathVerb, 'Day');
            continue;
        }

        // Add or subtract day if day of week & nthDayOfWeek are set (and no match)
        if (
            state.nthDayOfWeek > 0 &&
            !isNthDayMatch(currentDate, state.nthDayOfWeek)
        ) {
            applyTimezoneShift(fields, dst, currentDate, dateMathVerb, 'Day');
            continue;
        }

        // Match month
        if (!matchSchedule(currentDate.getMonth() + 1, fields.month)) {
            applyTimezoneShift(fields, dst, currentDate, dateMathVerb, 'Month');
            continue;
        }

        // Match hour
        if (!matchSchedule(currentHour, fields.hour)) {
            if (dst.start !== currentHour) {
                delete dst.start;
                applyTimezoneShift(fields, dst, currentDate, dateMathVerb, 'Hour');
                continue;
            } else if (!matchSchedule(currentHour - 1, fields.hour)) {
                currentDate[fnName(dateMathVerb, 'Hour')]();
                continue;
            }
        } else if (dst.end === currentHour) {
            if (!reverse) {
                delete dst.end;
                applyTimezoneShift(fields, dst, currentDate, 'add', 'Hour');
                continue;
            }
        }

        // Match minute
        if (!matchSchedule(currentDate.getMinutes(), fields.minute)) {
            applyTimezoneShift(fields, dst, currentDate, dateMathVerb, 'Minute');
            continue;
        }

        // Match second
        if (!matchSchedule(currentDate.getSeconds(), fields.second)) {
            applyTimezoneShift(fields, dst, currentDate, dateMathVerb, 'Second');
            continue;
        }

        // Increase a second in case in the first iteration the currentDate was not
        // modified
        if (startTimestamp === currentDate.getTime()) {
            if ((dateMathVerb === 'add') || (currentDate.getMilliseconds() === 0)) {
                applyTimezoneShift(fields, dst, currentDate, dateMathVerb, 'Second');
            } else {
                currentDate.setMilliseconds(0);
            }

            continue;
        }

        break;
    }

    if (stepCount >= LOOP_LIMIT) {
        throw new Error('Invalid expression, loop limit exceeded');
    }

    return {
        currentDate: new CronDate(currentDate, state.tz),
        dst,
        endDate: state.endDate,
        hasIterated: true,
        nthDayOfWeek: state.nthDayOfWeek,
        startDate: state.startDate,
        tz: state.tz
    };
};

export default findSchedule;