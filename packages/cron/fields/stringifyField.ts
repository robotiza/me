import compactField from "./compactField";
import { FieldItem } from "./fieldset";

const stringifyField = (arr: readonly FieldItem[], min: number, max: number) => {
    const ranges = compactField(arr);
    if (ranges.length === 1) {
        const singleRange = ranges[0];
        const step = singleRange.step ?? 1;
        if (step === 1 && singleRange.start === min && singleRange.end === max) {
            return '*';
        }
        if (step !== 1 && singleRange.start === min && singleRange.end === max - step + 1) {
            return '*/' + step;
        }
    }

    let result: (number | string)[] = [];
    for (let i = 0, l = ranges.length; i < l; ++i) {
        const { count, end, step, start } = ranges[i];
        if (count === 1) {
            result.push(start);
            continue;
        }

        if (step === 1) {
            result.push(start + '-' + end);
            continue;
        }

        const multiplier = start == 0 ? count - 1 : count;
        if (step * multiplier > end) {
            result = result.concat(
                Array
                    .from({ length: end - start + 1 })
                    .map((_, index) => start + index) 
                    .filter(value => (value - start) % step === 0)
            );
        } else if (end === max - step + 1) {
            result.push(start + '/' + step);
        } else {
            result.push(start + '-' + end + '/' + step);
        }
    }

    return result.join(',');
};

export default stringifyField;