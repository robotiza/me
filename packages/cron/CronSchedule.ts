import { CronDate } from "./date";
import { CronFieldIssues, CronTuple, ReadonlyCronFields, sanitize, stringify, toFields } from "./fields/fieldset";
import { DateType } from "./parse/options";
import findSchedule, { ScheduleState } from "./schedule/findSchedule";

/**
 * Cron iteration loop safety limit
 */
const LOOP_LIMIT = 10000;

type FnName = 'addMonth' | 'addDay' | 'addHour' | 'addMinute' | 'addSecond' | 'subtractMonth' | 'subtractDay' | 'subtractHour' | 'subtractMinute' | 'subtractSecond'

const fnName = (
    dateMathVerb: 'add' | 'subtract',
    method: 'Month' | 'Day' | 'Hour' | 'Minute' | 'Second'
): FnName => <FnName>(dateMathVerb + method);

export class CronSchedule {
    readonly fields: ReadonlyCronFields;
    readonly issues: CronFieldIssues | undefined;
    private state: ScheduleState;

    /**
     * Construct a new expression parser
     *
     * Options:
     *   currentDate: iterator start date
     *   endDate: iterator end date
     *
     * @constructor
     * @private
     * @param {Object} fields  Expression fields parsed values
     * @param {Object} options Parser options
     */
    constructor(tuple: CronTuple, private initialState: Omit<ScheduleState, 'hasIterated'> = { currentDate: new CronDate(), nthDayOfWeek: 0 }) {
        this.state = {
            ...initialState,
            hasIterated: false
        };

        const [fields, issues] = sanitize(toFields(tuple));

        this.fields = fields;
        this.issues = issues;
    }

    /**
     * Find next suitable date
     *
     * @public
     * @return {CronDate|Object}
     */
    next(): CronDate {
        this.state = findSchedule(this.fields, this.state);
        return this.state.currentDate;
    };

    /**
     * Find previous suitable date
     *
     * @public
     * @return {CronDate|Object}
     */
    prev(): CronDate {
        this.state = findSchedule(this.fields, this.state, true);
        return this.state.currentDate;
    };

    /**
     * Check if next suitable date exists
     *
     * @public
     * @return {Boolean}
     */
    hasNext(): boolean {
        try {
            findSchedule(this.fields, this.state);
            return true;
        } catch (err) {
            return false;
        }
    };

    /**
     * Check if previous suitable date exists
     *
     * @public
     * @return {Boolean}
     */
    hasPrev(): boolean {
        try {
            findSchedule(this.fields, this.state, true);
            return true;
        } catch (err) {
            return false;
        }
    };

    /**
     * Reset expression iterator state
     *
     * @public
     */
    reset(newDate: DateType) {
        this.state.currentDate = new CronDate(newDate ?? this.initialState.currentDate);
    };

    /**
     * Stringify the expression
     *
     * @public
     * @return {String}
     */
    stringify(): string {
        return stringify(this.fields);
    };
}