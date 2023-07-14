import { FieldConstraints } from "../fields/contraints";
import { FieldItem, FieldValue, FieldValues } from "../fields/fieldset";

/**
* Parse range
*
* @param {String} val
* @param {Number} repeatInterval Repetition interval
* @return {Array}
* @private
*/
const parseRange = (val: string, field: string, constraints: FieldConstraints, repeatInterval: number): FieldItem | FieldValues => {
    const stack = [];
    const atoms = val.split('-');

    if (atoms.length > 1) {
        // Invalid range, return value
        if (atoms.length < 2) {
            return +val as FieldValue;
        }

        if (!atoms[0].length) {
            if (!atoms[1].length) {
                throw new Error('Invalid range: ' + val);
            }

            return +val as FieldValue;
        }

        // Validate range
        const min = +atoms[0];
        const max = +atoms[1];

        if (Number.isNaN(min) || Number.isNaN(max) ||
            min < constraints.min || max > constraints.max) {
            throw new Error(
                'Constraint error, got range ' +
                min + '-' + max +
                ' expected range ' +
                constraints.min + '-' + constraints.max
            );
        } else if (min > max) {
            throw new Error('Invalid range: ' + val);
        }

        // Create range
        let repeatIndex = +repeatInterval;

        if (Number.isNaN(repeatIndex) || repeatIndex <= 0) {
            throw new Error('Constraint error, cannot repeat at every ' + repeatIndex + ' time.');
        }

        // JS DOW is in range of 0-6 (SUN-SAT) but we also support 7 in the expression
        // Handle case when range contains 7 instead of 0 and translate this value to 0
        if (field === 'dayOfWeek' && max % 7 === 0) {
            stack.push(0);
        }

        for (let index = min, count = max; index <= count; index++) {
            const exists = stack.indexOf(index) !== -1;
            if (!exists && repeatIndex > 0 && (repeatIndex % repeatInterval) === 0) {
                repeatIndex = 1;
                stack.push(index);
            } else {
                repeatIndex++;
            }
        }
        return stack as FieldValues;
    }

    return (Number.isNaN(+val) ? val : +val) as FieldItem;
}

export default parseRange;