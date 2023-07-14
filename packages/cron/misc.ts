export const DAY_OF_MONTH_DAY_OF_WEEK_ERROR_MSG = '? can only be specfied for Day-of-Month -OR- Day-of-Week';

export const isInvalidValues = (dayOfWeek: string, dayOfMonth: string): boolean => {
    const isAll = dayOfWeek === '*' && dayOfMonth === '*';
    const isAny = dayOfWeek === '?' && dayOfMonth === '?';
    return isAll || isAny;
};

export const isHasErrorMsg = (array: string | string[]): boolean => {
    return array.includes(DAY_OF_MONTH_DAY_OF_WEEK_ERROR_MSG);
};