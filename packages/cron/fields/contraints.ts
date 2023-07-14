import { FIELD_LAST, FieldChar, FieldItem, FieldLast, CronFields, FieldValue } from "./fieldset";
import { Serie } from "./serie";

export interface FieldConstraints {
    chars?: FieldChar[];
    max: Serie<0, 60>;
    min: Serie<0, 2>;
}

/**
 * Fields constraints
 * @type {Array}
 */
export const FIELD_CONSTRAINTS: FieldConstraints[] = [
    { min: 0, max: 59, chars: [] }, // Second
    { min: 0, max: 59, chars: [] }, // Minute
    { min: 0, max: 23, chars: [] }, // Hour
    { min: 1, max: 31, chars: [FIELD_LAST] }, // Day of month
    { min: 1, max: 12, chars: [] }, // Month
    { min: 0, max: 7, chars: [FIELD_LAST] }, // Day of week
];

export default FIELD_CONSTRAINTS;

export const isValidConstraintChar = (constraints: FieldConstraints, value: FieldItem): value is FieldChar => {
    if (typeof value !== 'string') {
        return false;
    }

    return constraints.chars?.some(char => value.indexOf(char) > -1) ?? false;
};

export const validateConstraints = (field: keyof CronFields, values: readonly FieldItem[], constraints: FieldConstraints) => {
    if (!values) {
        throw new Error('Validation error, Field ' + field + ' is missing');
    }
    if (values.length === 0) {
        throw new Error('Validation error, Field ' + field + ' contains no values');
    }
    for (let i = 0, c = values.length; i < c; i++) {
        const value = values[i];

        if (isValidConstraintChar(constraints, value)) {
            continue;
        }

        // Check constraints
        if (typeof value !== 'number' || Number.isNaN(value) || value < constraints.min || value > constraints.max) {
            throw new Error(
                'Constraint error, got value ' + value + ' expected range ' +
                constraints.min + '-' + constraints.max
            );
        }
    }
};