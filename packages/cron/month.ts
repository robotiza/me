import { DayOfMonth } from "./fields/fieldset";
import { DAY_OF_MONTH_DAY_OF_WEEK_ERROR_MSG, isHasErrorMsg, isInvalidValues } from "./misc";

export const DAY_OF_MONTH_ERROR_MSG_1 = 'Day of month values must be between 1 and 31';
export const DAY_OF_MONTH_ERROR_MSG_2 = 'Offset from last day must be <= 30';
export const MONTH_ERROR_MSG = 'Month values must be between 1 and 12';
export const MONTH_LETTER_ERROR_MSG = 'Month values must be JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV, DEC OR between 1 and 12';

const MONTH_LIST = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

/**
 * Days in month
 * @type {number[]}
 */
export const DAYS_IN_MONTH: DayOfMonth[] = [
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

/**
 * Field aliases
 * @type {Object}
 */
export const MONTH_ALIASES: Record<string, number> = {
    jan: 1,
    feb: 2,
    mar: 3,
    apr: 4,
    may: 5,
    jun: 6,
    jul: 7,
    aug: 8,
    sep: 9,
    oct: 10,
    nov: 11,
    dec: 12
};

export const isValidateMonthNo = (monthArr: string[], val: number, endVal: number) =>
    monthArr.every(month => {
        const monthNo = parseInt(month);
        return monthNo >= val && monthNo <= endVal;
    });

export const isValidateMonthStr = (monthArr: string[], dataArr: string[]) =>
    monthArr.every(month => dataArr.includes(month.toLowerCase()));

export const isValidMonthValue = function (month: string): [boolean, ...string[]] {
    if (month === '*') {
        return [true];
    }

    const errors: string[] = [];

    if (month.includes('/')) {
        let startingMonthOptionArr = month.split('/');
        const validMonthNo0 = isValidateMonthNo([startingMonthOptionArr[0]], 1, 12);
        const validMonthNo1 = isValidateMonthNo([startingMonthOptionArr[1]], 0, 12);

        if (!validMonthNo0) {
            errors.push(MONTH_ERROR_MSG);
        }
        if (!validMonthNo1) {
            errors.push('(Month) - Expression ' + startingMonthOptionArr[1] + ' is not a valid increment value. Accepted values are 0-12');
        }
        return [validMonthNo0 && validMonthNo1, ...errors];
    }

    if (month.includes('-')) {
        let monthRangeArr = month.split('-');
        if (!isNaN(parseInt(monthRangeArr[0])) && !isNaN(parseInt(monthRangeArr[1])) && !isValidateMonthNo(monthRangeArr, 1, 12)) {
            errors.push(MONTH_ERROR_MSG);
        }
        if (isNaN(parseInt(monthRangeArr[0])) && isNaN(parseInt(monthRangeArr[1])) && !isValidateMonthStr(monthRangeArr, MONTH_LIST)) {
            errors.push(MONTH_LETTER_ERROR_MSG);
        }
        return [!isNaN(parseInt(monthRangeArr[0])) && !isNaN(parseInt(monthRangeArr[1])) ?
            isValidateMonthNo(monthRangeArr, 1, 12) : isValidateMonthStr(monthRangeArr, MONTH_LIST), ...errors];
    }

    if (month.includes(',')) {
        let multiMonthArr = month.split(',');
        if (!isNaN(parseInt(multiMonthArr[0])) && !isValidateMonthNo(multiMonthArr, 1, 12)) {
            errors.push(MONTH_ERROR_MSG);
        }
        if (isNaN(parseInt(multiMonthArr[0])) && !isValidateMonthStr(multiMonthArr, MONTH_LIST)) {
            errors.push(MONTH_LETTER_ERROR_MSG);
        }
        return [!isNaN(parseInt(multiMonthArr[0])) ?
            isValidateMonthNo(multiMonthArr, 1, 12) : isValidateMonthStr(multiMonthArr, MONTH_LIST), ...errors];
    }

    if (typeof month === 'string') {
        if (!isNaN(parseInt(month)) && !isValidateMonthNo([month], 1, 12)) {
            errors.push(MONTH_ERROR_MSG);
        }
        if (isNaN(parseInt(month)) && !isValidateMonthStr([month], MONTH_LIST)) {
            errors.push(MONTH_LETTER_ERROR_MSG);
        }
        return [!isNaN(parseInt(month)) ?
            isValidateMonthNo([month], 1, 12) : isValidateMonthStr([month], MONTH_LIST), ...errors];
    }

    return [false, MONTH_LETTER_ERROR_MSG];
}

export const isValidDayOfMonthValue = function (dayOfMonth: string, dayOfWeek: string): [boolean, ...string[]] {
    const isNotLastDays = !dayOfMonth.toLowerCase().includes('l') || dayOfMonth.toLowerCase() !== 'lw';

    if ((dayOfMonth === '*' && dayOfWeek !== '*') || (dayOfMonth === '?' && dayOfWeek !== '?')) {
        return [true];
    }

    const errors: string[] = [];

    if (dayOfMonth.includes('/') && dayOfWeek === '?') {
        let startingDayOfMonthOptionArr = dayOfMonth.split('/');
        if (!isValidateMonthNo([startingDayOfMonthOptionArr[0]], 1, 31) && startingDayOfMonthOptionArr[0] !== '*') {
            errors.push(DAY_OF_MONTH_ERROR_MSG_1);
        }
        if (!isValidateMonthNo([startingDayOfMonthOptionArr[1]], 0, 31)) {
            errors.push("(Day of month) - Expression " + startingDayOfMonthOptionArr[1] + " is not a valid increment value. Accepted values are 0-31");
        }
        const isValidElements = isValidateMonthNo([startingDayOfMonthOptionArr[0]], 1, 31) && isValidateMonthNo([startingDayOfMonthOptionArr[1]], 0, 31);
        const isValidFirstElem = startingDayOfMonthOptionArr[0] === '*' && isValidateMonthNo([startingDayOfMonthOptionArr[1]], 0, 31);
        return [isValidElements || isValidFirstElem, ...errors];
    }

    if (dayOfMonth.includes('-') && dayOfWeek === '?') {
        let dayOfMonthRangeArr = dayOfMonth.split('-');
        const isLastDayIncludes = dayOfMonthRangeArr[0] === 'L' && isValidateMonthNo([dayOfMonthRangeArr[1]], 1, 30)
        if (!isLastDayIncludes) {
            errors.push(DAY_OF_MONTH_ERROR_MSG_2);
        }
        if (!isValidateMonthNo(dayOfMonthRangeArr, 1, 31) && dayOfMonthRangeArr[0] !== 'L') {
            errors.push(DAY_OF_MONTH_ERROR_MSG_1);
        }
        return [isValidateMonthNo(dayOfMonthRangeArr, 1, 31) || isLastDayIncludes, ...errors];
    }

    if (dayOfMonth.includes(',') && dayOfWeek === '?') {
        let multiDayOfMonthArr = dayOfMonth.split(',');
        if (!isValidateMonthNo(multiDayOfMonthArr, 1, 31)) {
            errors.push(DAY_OF_MONTH_ERROR_MSG_1);
        }
        return [isValidateMonthNo(multiDayOfMonthArr, 1, 31), ...errors];
    }

    if (typeof dayOfMonth === 'string' && dayOfWeek === '?' && (dayOfMonth.toLowerCase() === 'l' || dayOfMonth.toLowerCase() === 'lw')) {
        return [true];
    }

    if (typeof dayOfMonth === 'string' && dayOfWeek === '?' && dayOfMonth !== '?' && isNotLastDays) {
        if (parseInt(dayOfMonth) < 1 && parseInt(dayOfMonth) > 31) {
            errors.push(DAY_OF_MONTH_ERROR_MSG_1);
        }
        return [parseInt(dayOfMonth) >= 1 && parseInt(dayOfMonth) <= 31, ...errors];
    }


    if (isInvalidValues(dayOfWeek, dayOfMonth) && !isHasErrorMsg(errors)) {
        errors.push(DAY_OF_MONTH_DAY_OF_WEEK_ERROR_MSG);
    } else {
        errors.push(DAY_OF_MONTH_ERROR_MSG_1);
    }

    return [false, ...errors];
};

const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july',
    'august', 'september', 'october', 'november', 'december'];
const shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug',
    'sep', 'oct', 'nov', 'dec'];

const convertMonthName = (expression: string, items: string | any[]) => {
    for (let i = 0; i < items.length; i++) {
        expression = expression.replace(new RegExp(items[i], 'gi'), String(i + 1));
    }
    return expression;
};

export const convertMonthNames = (monthExpression: string) => {
    monthExpression = convertMonthName(monthExpression, months);
    monthExpression = convertMonthName(monthExpression, shortMonths);
    return monthExpression;
};