import { FieldConstraints } from "../fields/contraints";
import { FieldItem, FieldValues } from "../fields/fieldset";
import parseRange from "./parseRange";

/**
 * Parse repetition interval
 *
 * @param {String} val
 * @return {Array}
 */
const parseRepeat = (val: string, field: string, constraints: FieldConstraints): FieldItem | FieldValues => {
    const repeatInterval = 1;
    let atoms: string[] = val.split('/');

    if (atoms.length > 2) {
        throw new Error('Invalid repeat: ' + val);
    }

    if (atoms.length > 1) {
        if (atoms[0] == String(+atoms[0])) {
            atoms = [atoms[0] + '-' + constraints.max, atoms[1]];
        }
        return parseRange(atoms[0], field, constraints, Number(atoms[atoms.length - 1]));
    }

    return parseRange(val, field, constraints, repeatInterval);
}

export default parseRepeat;
