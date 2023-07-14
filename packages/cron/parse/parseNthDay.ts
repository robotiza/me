import { ParserOptions } from "./options";

/**
 * Parses out the # special character for the dayOfWeek field & adds it to options.
 *
 * @param {String} val
 * @return {String}
 * @private
 */
const parseNthDay = (val: string, options: ParserOptions) => {
    const atoms = val.split('#');
    if (atoms.length > 1) {
        const nthValue = +atoms[atoms.length - 1];
        if (/,/.test(val)) {
            throw new Error('Constraint error, invalid dayOfWeek `#` and `,` '
                + 'special characters are incompatible');
        }
        if (/\//.test(val)) {
            throw new Error('Constraint error, invalid dayOfWeek `#` and `/` '
                + 'special characters are incompatible');
        }
        if (/-/.test(val)) {
            throw new Error('Constraint error, invalid dayOfWeek `#` and `-` '
                + 'special characters are incompatible');
        }
        if (atoms.length > 2 || Number.isNaN(nthValue) || (nthValue < 1 || nthValue > 5)) {
            throw new Error('Constraint error, invalid dayOfWeek occurrence number (#)');
        }

        options.nthDayOfWeek = nthValue;
        return atoms[0];
    }
    return val;
}

export default parseNthDay;