import { DAYS_IN_MONTH } from "../month";
import { CronFields, FIELD_LAST } from "./fieldset";
import sortCompareFn from "./sortCompareFn";

const sanitizeMaxDaysInMonth = (fields: CronFields): void => {
    // Filter out any day of month value that is larger than given month expects
    const daysInMonth = DAYS_IN_MONTH[fields.month[0] - 1];

    if (fields.month.length === 1) {
        const dayOfMonth = fields.dayOfMonth[0];
        if (dayOfMonth !== FIELD_LAST && dayOfMonth > daysInMonth) {
            throw new Error('Invalid explicit day of month definition');
        }

        fields.dayOfMonth =
            fields.dayOfMonth
                .filter(item => item === FIELD_LAST ? true : item <= daysInMonth)
                .sort(sortCompareFn)
                .filter((item, pos, ary) => {
                    return !pos || item !== ary[pos - 1];
                }) as CronFields['dayOfMonth'];
    }
};

export default sanitizeMaxDaysInMonth;