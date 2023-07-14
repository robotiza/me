import { FieldConstraints, isValidConstraintChar } from "../fields/contraints";
import { FieldItem, FieldValue, CronTuple, FieldItems, FieldValues } from "../fields/fieldset";
import parseRepeat from "./parseRepeat";
import sortCompareFn from "../fields/sortCompareFn";

/**
 * Parse sequence
 *
 * @param {String} val
 * @return {Array}
 * @private
 */
const parseSequence = (val: string, field: string, constraints: FieldConstraints): FieldItem[] => {
    const stack: FieldItem[] = [];

    function handleResult(result: FieldItem | FieldValues) {
        if (result instanceof Array) { // Make sequence linear
            for (let i = 0, c = result.length; i < c; i++) {
                const value = result[i];

                if (isValidConstraintChar(constraints, value)) {
                    stack.push(value);
                    continue;
                }
                // Check constraints
                if (typeof value !== 'number' || Number.isNaN(value) || value < constraints.min || value > constraints.max) {
                    throw new Error(
                        'Constraint error, got value ' + value + ' expected range ' +
                        constraints.min + '-' + constraints.max
                    );
                }

                stack.push(value as FieldValue);
            }
        } else { // Scalar value

            if (isValidConstraintChar(constraints, result)) {
                stack.push(result);
                return;
            }

            let numResult = +result;

            // Check constraints
            if (Number.isNaN(numResult) || numResult < constraints.min || numResult > constraints.max) {
                throw new Error(
                    'Constraint error, got value ' + result + ' expected range ' +
                    constraints.min + '-' + constraints.max
                );
            }

            if (field === 'dayOfWeek') {
                numResult = numResult % 7;
            }

            stack.push(numResult as FieldValue);
        }
    }

    const atoms = val.split(',');
    if (!atoms.every(function (atom) {
        return atom.length > 0;
    })) {
        throw new Error('Invalid list value format');
    }

    if (atoms.length > 1) {
        for (let i = 0, c = atoms.length; i < c; i++) {
            handleResult(parseRepeat(atoms[i], field, constraints));
        }
    } else {
        handleResult(parseRepeat(val, field, constraints));
    }

    stack.sort(sortCompareFn);

    return stack;
};

export default  parseSequence;