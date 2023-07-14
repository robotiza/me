import { Serie } from "./serie";
import sortCompareFn from "./sortCompareFn";
import stringifyField from "./stringifyField";

/**
 * Field mappings
 * @type {Array}
 */
export const FIELD_NAMES = ['second', 'minute', 'hour', 'dayOfMonth', 'month', 'dayOfWeek'] as const;

export type FieldName = typeof FIELD_NAMES[number];

export const FIELD_LAST = 'L';

export type FieldLast = typeof FIELD_LAST;

export type FieldChar = FieldLast;

export interface FieldConstraints {
    chars?: FieldChar[];
    max: Serie<7, 60>;
    min: Serie<0, 2>;
}

/**
 * Cron constraints
 * @type {Object}
 */
export const CRON_CONSTRAINTS: Readonly<Record<FieldName, FieldConstraints>> = Object.freeze({
    second: { min: 0, max: 59, chars: [] },
    minute: { min: 0, max: 59, chars: [] },
    hour: { min: 0, max: 23, chars: [] },
    dayOfMonth: { min: 1, max: 31, chars: [FIELD_LAST] },
    month: { min: 1, max: 12, chars: [] },
    dayOfWeek: { min: 0, max: 7, chars: [FIELD_LAST] }
});

export type SixtySerie = Serie<0, 30> | Serie<30, 60>; // Typescript restriction on recursion depth

export type Hour = Serie<0, 24>;

export type DayOfMonth = Serie<1, 32>;

export type MonthDay = Serie<1, 13>;

export type DayOfWeek = Serie<0, 8>;

type SecondValues = readonly SixtySerie[];
type MinuteValues = readonly SixtySerie[];
type HourValues = readonly Hour[];
type DayOfMonthValues = readonly DayOfMonth[];
type MonthValues = readonly MonthDay[];
type DayOfWeekValues = readonly DayOfWeek[];

type DayOfMonthItems = DayOfMonthValues | readonly [...DayOfMonth[], FieldLast];
type DayOfWeekItems = DayOfWeekValues | readonly [...DayOfWeek[], FieldLast];
export type FieldItems =
    SecondValues |
    MinuteValues |
    HourValues |
    DayOfMonthItems |
    MonthValues |
    DayOfWeekItems;
export type FieldItem = FieldItems[number];
export type FieldValues =
    SecondValues |
    MinuteValues |
    HourValues |
    DayOfMonthValues |
    MonthValues |
    DayOfWeekValues;
export type FieldValue = FieldValues[number];

export type CronTuple = readonly [
    SecondValues,
    MinuteValues,
    HourValues,
    DayOfMonthItems,
    MonthValues,
    DayOfWeekItems
];

export type MappedFields = Record<FieldName, FieldItems>

export interface CronFields extends MappedFields {
    second: SecondValues;
    minute: MinuteValues;
    hour: HourValues;
    dayOfMonth: DayOfMonthItems;
    month: MonthValues;
    dayOfWeek: DayOfWeekItems;
}

export type ReadonlyCronFields = Readonly<CronFields>;

export const freeze = ({
    second,
    minute,
    hour,
    dayOfMonth,
    month,
    dayOfWeek
}: CronFields): ReadonlyCronFields => Object.freeze({
    second,
    minute,
    hour,
    dayOfMonth,
    month,
    dayOfWeek
});

const MONTH_LIST = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/**
 * Days in month
 * @type {number[]}
 */
const DAYS_IN_MONTH = [
    31,
    29,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
];

const unique = <T>(value: T, index: number, arr: T[]): boolean => !index || value !== arr[index - 1];

export type CronFieldIssues = Partial<Record<FieldName, string[]>>;

export const sanitize = (fields: CronFields): [CronFields] | [CronFields, CronFieldIssues] => {
    const issues: CronFieldIssues = {
    };

    const issue = (fieldName: FieldName, message: string): void => {
        if (Array.isArray(issues[fieldName])) {
            issues[fieldName]?.push(message);
        } else {
            issues[fieldName] = [message];
        }
    }

    const mappedFields = {
        second: [...fields.second],
        minute: [...fields.minute],
        hour: [...fields.hour],
        dayOfMonth: [...fields.dayOfMonth],
        month: [...fields.month],
        dayOfWeek: [...fields.dayOfWeek]
    };

    FIELD_NAMES.forEach((fieldName: FieldName) => {
        const input: FieldItem[] = mappedFields[fieldName];
        let output = input.sort(sortCompareFn).filter(unique);
        if (input.length !== output.length) {
            issue(fieldName, `Field ${fieldName} contains duplicate values`);
        }
        const { max, min, chars } = CRON_CONSTRAINTS[fieldName];
        output = output.filter((item: FieldItem) => {
            if (typeof item === 'number') {
                if (item < min) {
                    issue(fieldName, `Field ${fieldName} contains value ${item} which is less than minimum value ${min}`);
                    return false;
                }
                else if (item > max) {
                    issue(fieldName, `Field ${fieldName} contains value ${item} which is greater than maximum value ${max}`);
                    return false
                }
            } else if (!chars?.includes(item)) {
                issue(fieldName, `Field ${fieldName} contains invalid character ${item}`);
                return false;
            }
        });
        Object.assign(mappedFields, { [fieldName]: output });
    });

    if (fields.month.length === 1) {
        // Filter out any day of month value that is larger than given month expects
        const daysInMonth = DAYS_IN_MONTH[fields.month[0] - 1];

        const dom = fields.dayOfMonth[0];
        if (dom !== FIELD_LAST && dom > daysInMonth) {
            issue('dayOfMonth', `Day of month ${dom} is invalid for month ${MONTH_LIST[fields.month[0] - 1]}`);
        }

        mappedFields.dayOfMonth = mappedFields.dayOfMonth.filter(item => item === FIELD_LAST ? true : item <= daysInMonth);
    }

    const result: CronFields = {
        second: Object.freeze(mappedFields.second) as SecondValues,
        minute: Object.freeze(mappedFields.minute) as MinuteValues,
        hour: Object.freeze(mappedFields.hour) as HourValues,
        dayOfMonth: Object.freeze(mappedFields.dayOfMonth) as DayOfMonthItems,
        month: Object.freeze(mappedFields.month) as MonthValues,
        dayOfWeek: Object.freeze(mappedFields.dayOfWeek) as DayOfWeekItems
    };

    if (Object.keys(issues).length > 0) {
        return [result, issues];
    }

    return [result];
};


export const stringify = (fields: CronFields): string => {
    const { second, minute, hour, dayOfMonth, month, dayOfWeek } = fields;

    const tuple = [
        stringifyField(second, CRON_CONSTRAINTS.second.min, CRON_CONSTRAINTS.second.max),
        stringifyField(minute, CRON_CONSTRAINTS.minute.min, CRON_CONSTRAINTS.minute.max),
        stringifyField(hour, CRON_CONSTRAINTS.hour.min, CRON_CONSTRAINTS.hour.max),
        month.length === 1
            ? stringifyField(dayOfMonth, 1, DAYS_IN_MONTH[month[0] - 1])
            : stringifyField(dayOfMonth, CRON_CONSTRAINTS.dayOfMonth.min, CRON_CONSTRAINTS.dayOfMonth.max),
        stringifyField(month, CRON_CONSTRAINTS.month.min, CRON_CONSTRAINTS.month.max),
        stringifyField(
            dayOfWeek[dayOfWeek.length - 1] === 7 ? dayOfWeek.slice(0, -1) : dayOfWeek,
            CRON_CONSTRAINTS.dayOfWeek.min, CRON_CONSTRAINTS.dayOfWeek.max)
    ];

    return tuple.join(' ');
};

export const toFields = ([
    second,
    minute,
    hour,
    dayOfMonth,
    month,
    dayOfWeek
]: CronTuple): CronFields => ({
    second,
    minute,
    hour,
    dayOfMonth,
    month,
    dayOfWeek
});

export const toTuple = ({
    second,
    minute,
    hour,
    dayOfMonth,
    month,
    dayOfWeek
}: CronFields): CronTuple => ([
    second,
    minute,
    hour,
    dayOfMonth,
    month,
    dayOfWeek
]);

export const tuplify = (fields: FieldItem[][]): CronTuple => {
    const [
        second,
        minute,
        hour,
        dayOfMonth,
        month,
        dayOfWeek
    ] = fields;

    return Object.freeze([
        second as SecondValues,
        minute as MinuteValues,
        hour as HourValues,
        dayOfMonth as DayOfMonthItems,
        month as MonthValues,
        dayOfWeek as DayOfWeekItems
    ]);
};