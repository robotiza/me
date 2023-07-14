import { CronDate } from "../date";
import constraints from "../fields/contraints";
import { CronTuple, FIELD_NAMES, FieldItem, tuplify } from "../fields/fieldset";
import predefined from "../predefined";
import { ParserOptions } from "./options";
import parseField from "./parseField";
import parseNthDay from "./parseNthDay";

/**
 * Field defaults
 * @type {Array}
 */
const DEFAULTS = ['0', '*', '*', '*', '*', '*'];

/**
 * Parse input expression (async)
 *
 * @public
 * @param {String} expression Input expression
 * @param {Object} [options] Parsing options
 */
const parseExpression = (expression: string, options: ParserOptions): CronTuple => {
    if (typeof options.currentDate === 'undefined') {
        options.currentDate = new CronDate(undefined, options.tz);
    }

    // Is input expression predefined?
    if (predefined[expression]) {
        expression = predefined[expression];
    }

    // Split fields
    const fields: FieldItem[][] = [];
    const atoms = (expression + '').trim().split(/\s+/);

    if (atoms.length > 6) {
        throw new Error('Invalid cron expression');
    }

    // Resolve fields
    const start = (FIELD_NAMES.length - atoms.length);
    for (let i = 0, c = FIELD_NAMES.length; i < c; ++i) {
        const field = FIELD_NAMES[i]; // Field name
        const value = atoms[atoms.length > c ? i : i - start]; // Field value

        if (i < start || !value) { // Use default value
            fields.push(parseField(
                field,
                DEFAULTS[i],
                constraints[i]
            )
            );
        } else {
            const val = field === 'dayOfWeek' ? parseNthDay(value, options) : value;

            fields.push(parseField(
                field,
                val,
                constraints[i]
            )
            );
        }
    }

    return tuplify(fields);
};

export default parseExpression;