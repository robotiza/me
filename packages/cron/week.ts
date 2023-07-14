import { DAY_OF_MONTH_DAY_OF_WEEK_ERROR_MSG, isHasErrorMsg, isInvalidValues } from "./misc";
import { isValidateMonthNo, isValidateMonthStr } from "./month";

const DAY_OF_WEEK_ERROR_MSG_1 = 'Day-of-Week values must be between 1 and 7';
const DAY_OF_WEEK_ERROR_MSG_2 = 'Day-of-Week values must be SUN, MON, TUE, WED, THU, FRI, SAT OR between 1 and 7, - * ? / L #';
const DAY_OF_WEEK_ERROR_MSG_3 = '(Day of week) - Unsupported value for field. Possible values are 1-7 or SUN-SAT , - * ? / L #';
const DAY_OF_WEEK_ERROR_MSG_4 = 'A numeric value between 1 and 5 must follow the # option';

const WEEK_ARRRAY = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const DAY_OF_WEEK_ALIASES: Record<string, number> = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6
}

export const isValidDayOfWeekValue = function (dayOfWeek: string, dayOfMonth: string): [boolean, ...string[]] {

    if ((dayOfWeek === '*' && dayOfMonth !== '*') || (dayOfWeek === '?' && dayOfMonth !== '?')) {
        return [true];
    }
    if (dayOfWeek.toLowerCase() === 'l') {
        return [true];
    }
    if (dayOfWeek === '*') {
        return [dayOfMonth !== '*'];
    }

    const errors: string[] = [];

    if (dayOfWeek.includes('/') && dayOfMonth === '?') {
        let startingDayOfWeekOptionArr = dayOfWeek.split('/');

        if (!isValidateMonthNo([startingDayOfWeekOptionArr[0]], 1, 7)) {
            errors.push(DAY_OF_WEEK_ERROR_MSG_1);
        }
        if (!isValidateMonthNo([startingDayOfWeekOptionArr[1]], 0, 7)) {
            errors.push('Expression ' + startingDayOfWeekOptionArr[1] + ' is not a valid increment value. Accepted values are 0-7');
        }
        return [isValidateMonthNo([startingDayOfWeekOptionArr[0]], 1, 7) && isValidateMonthNo([startingDayOfWeekOptionArr[1]], 0, 7), ...errors];
    }

    if (dayOfWeek.includes('-') && dayOfMonth === '?') {
        let dayOfWeekRangeArr = dayOfWeek.split('-');
        if (!isNaN(parseInt(dayOfWeekRangeArr[0])) && !isNaN(parseInt(dayOfWeekRangeArr[1])) && !isValidateMonthNo(dayOfWeekRangeArr, 1, 7)) {
            errors.push(DAY_OF_WEEK_ERROR_MSG_1);
        }
        if (isNaN(parseInt(dayOfWeekRangeArr[0])) && isNaN(parseInt(dayOfWeekRangeArr[1])) && !isValidateMonthStr(dayOfWeekRangeArr, WEEK_ARRRAY)) {
            errors.push(DAY_OF_WEEK_ERROR_MSG_2);
        }
        return [!isNaN(parseInt(dayOfWeekRangeArr[0])) && !isNaN(parseInt(dayOfWeekRangeArr[1])) ?
            isValidateMonthNo(dayOfWeekRangeArr, 1, 7) : isValidateMonthStr(dayOfWeekRangeArr, WEEK_ARRRAY), ...errors];

    }

    if (dayOfWeek.includes(',') && dayOfMonth === '?') {
        let multiDayOfWeekArr = dayOfWeek.split(',');
        if (!isNaN(parseInt(multiDayOfWeekArr[0])) && !isValidateMonthNo(multiDayOfWeekArr, 1, 7)) {
            errors.push(DAY_OF_WEEK_ERROR_MSG_1);
        }
        if (isNaN(parseInt(multiDayOfWeekArr[0])) && !isValidateMonthStr(multiDayOfWeekArr, WEEK_ARRRAY)) {
            errors.push(DAY_OF_WEEK_ERROR_MSG_2);
        }
        return [!isNaN(parseInt(multiDayOfWeekArr[0])) ?
            isValidateMonthNo(multiDayOfWeekArr, 1, 7) : isValidateMonthStr(multiDayOfWeekArr, WEEK_ARRRAY), ...errors];
    }

    if (dayOfWeek.includes('#') && dayOfMonth === '?') {
        let weekdayOfMonthArr = dayOfWeek.split('#');
        if (!isValidateMonthNo([weekdayOfMonthArr[0]], 1, 7)) {
            errors.push(DAY_OF_WEEK_ERROR_MSG_3);
        }
        if (!isValidateMonthNo([weekdayOfMonthArr[1]], 1, 5)) {
            errors.push(DAY_OF_WEEK_ERROR_MSG_4);
        }
        return [isValidateMonthNo([weekdayOfMonthArr[0]], 1, 7) && isValidateMonthNo([weekdayOfMonthArr[1]], 1, 5), ...errors];
    }

    if (typeof dayOfWeek === 'string' && dayOfMonth === '?') {
        if (!isNaN(parseInt(dayOfWeek)) && !isValidateMonthNo([dayOfWeek], 1, 7)) {
            errors.push(DAY_OF_WEEK_ERROR_MSG_1);
        }
        if (isNaN(parseInt(dayOfWeek)) && !isValidateMonthStr([dayOfWeek], WEEK_ARRRAY)) {
            errors.push(DAY_OF_WEEK_ERROR_MSG_2);
        }
        return [!isNaN(parseInt(dayOfWeek)) ?
            isValidateMonthNo([dayOfWeek], 1, 7) : isValidateMonthStr([dayOfWeek], WEEK_ARRRAY), ...errors];
    }

    if (isInvalidValues(dayOfWeek, dayOfMonth) && !isHasErrorMsg(errors)) {
        errors.push(DAY_OF_MONTH_DAY_OF_WEEK_ERROR_MSG);
    } else {
        errors.push(DAY_OF_WEEK_ERROR_MSG_2 + " or * or /");
    }

    return [false, ...errors];
};

const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday',
    'friday', 'saturday'];
const shortWeekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const convertWeekDayName = (expression: string, items: string | any[]): string => {
    for (let i = 0; i < items.length; i++) {
        expression = expression.replace(new RegExp(items[i], 'gi'), String(i));
    }
    return expression;
}

export const convertWeekDays = (expression: string): string => {
    expression = expression.replace('7', '0');
    expression = convertWeekDayName(expression, weekDays);
    return convertWeekDayName(expression, shortWeekDays);
}