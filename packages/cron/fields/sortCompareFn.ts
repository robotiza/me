import { FieldItem } from "./fieldset";

const sortCompareFn = (a: FieldItem, b: FieldItem): number => {
    const aIsNumber = typeof a === 'number';
    const bIsNumber = typeof b === 'number';

    if (aIsNumber && bIsNumber) {
        return a - b;
    }

    if (!aIsNumber && bIsNumber) {
        return 1;
    }

    if (aIsNumber && !bIsNumber) {
        return -1;
    }

    return String(a).localeCompare(String(b));
};

export default sortCompareFn;