import { CRON_DAILY, CRON_HOURLY, CRON_MONTHLY, CRON_SUN } from "./constants";
import { isValidCronExpression as isValidCronExpression2 } from ".";
import { convertAsterisksToRanges } from "./aterisk";
import { convertAllRanges } from "./range";
import { convertSteps } from "./step";
import { convertWeekDays } from "./week";
import { convertMonthNames } from "./month";

export const CRON_MACROS: Record<string, string> = {
    '@hourly': CRON_HOURLY,
    '@daily': CRON_DAILY,
    '@weekly': CRON_SUN,
    '@monthly': CRON_MONTHLY
};

export const isValidCronExpression = (expr: string): boolean => {
    const preset = CRON_MACROS[expr];

    if (preset) {
        return isValidCronExpression2(preset);
    }

    return isValidCronExpression2(expr);
};

function appendSeccondExpression(expressions: string[]): string[] {
    if (expressions.length === 5) {
        return ['0'].concat(expressions);
    }
    return expressions;
}

function removeSpaces(str: string): string {
    return str.replace(/\s{2,}/g, ' ').trim();
}

// Function that takes care of normalization.
const normalizeIntegers = (expressions: string[]): string[] => 
    expressions.map(expression => expression.split(',').map(number => parseInt(number)).join(','));

/*
* The node-cron core allows only numbers (including multiple numbers e.g 1,2).
* This module is going to translate the month names, week day names and ranges
* to integers relatives.
*
* Month names example:
*  - expression 0 1 1 January,Sep *
*  - Will be translated to 0 1 1 1,9 *
*
* Week day names example:
*  - expression 0 1 1 2 Monday,Sat
*  - Will be translated to 0 1 1 1,5 *
*
* Ranges example:
*  - expression 1-5 * * * *
*  - Will be translated to 1,2,3,4,5 * * * *
*/
export function interprete(expression: string): string[] {
    let expressions = removeSpaces(expression).split(' ');
    expressions = appendSeccondExpression(expressions);
    expressions[4] = convertMonthNames(expressions[4]);
    expressions[5] = convertWeekDays(expressions[5]);
    expressions = convertAsterisksToRanges(expressions);
    expressions = convertAllRanges(expressions);
    expressions = convertSteps(expressions);

    return normalizeIntegers(expressions);
}