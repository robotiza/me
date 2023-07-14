import { MONTH_ALIASES } from "../month";
import { DAY_OF_WEEK_ALIASES } from "../week";
import { FieldConstraints } from "../fields/contraints";
import { FieldItem } from "../fields/fieldset";
import parseSequence from "./parseSequence";

const STANDARD_VALID_CHARACTERS = /^[,*\d/-]+$/;
const DAY_OF_WEEK_VALID_CHARACTERS = /^[?,*\dL#/-]+$/;
const DAY_OF_MONTH_VALID_CHARACTERS = /^[?,*\dL/-]+$/;
const VALID_CHARACTERS: Record<string, RegExp> = {
    second: STANDARD_VALID_CHARACTERS,
    minute: STANDARD_VALID_CHARACTERS,
    hour: STANDARD_VALID_CHARACTERS,
    dayOfMonth: DAY_OF_MONTH_VALID_CHARACTERS,
    month: STANDARD_VALID_CHARACTERS,
    dayOfWeek: DAY_OF_WEEK_VALID_CHARACTERS,
};

/**
 * Parse input interval
 *
 * @param {String} field Field symbolic name
 * @param {String} value Field value
 * @param {Array} constraints Range upper and lower constraints
 * @return {Array} Sequence of sorted values
 * @private
 */
const parseField = (field: string, value: string, constraints: FieldConstraints): FieldItem[] => {
    // Replace aliases
    switch (field) {
        case 'month':
        case 'dayOfWeek':
            const aliases = {
                month: MONTH_ALIASES,
                dayOfWeek: DAY_OF_WEEK_ALIASES
            }[field];

            value = value.replace(/[a-z]{3}/gi, (match) => {
                match = match.toLowerCase();

                if (typeof aliases[match] !== 'undefined') {
                    return String(aliases[match]);
                } else {
                    throw new Error('Validation error, cannot resolve alias "' + match + '"');
                }
            });
            break;
    }

    // Check for valid characters.
    if (!(VALID_CHARACTERS[field].test(value))) {
        throw new Error('Invalid characters, got value: ' + value);
    }

    // Replace '*' and '?'
    if (value.indexOf('*') !== -1) {
        value = value.replace(/\*/g, constraints.min + '-' + constraints.max);
    } else if (value.indexOf('?') !== -1) {
        value = value.replace(/\?/g, constraints.min + '-' + constraints.max);
    }

    //
    // Inline parsing functions
    //
    // Parser path:
    //  - parseSequence
    //    - parseRepeat
    //      - parseRange
    return parseSequence(value, field, constraints);
};

export default parseField;