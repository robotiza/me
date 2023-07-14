import { FieldLast, SixtySerie } from "./fieldset";
import { Serie } from "./serie";

interface One {
    start: number;
    count: 1;
    end?: number;
    step?: number;
}

interface More {
    start: number;
    count: Serie<2, 24>;
    end: number;
    step: number;
}

export type Range = One | More;

export const buildRange = (item: number): Range => ({
    start: item,
    count: 1
});

export const completeRangeWithItem = (range: Range, item: number) => {
    range.end = item;
    range.step = item - range.start;
    range.count = 2;
}

export const finalizeCurrentRange = (
    results: Range[],
    currentRange?: Range,
    currentItemRange?: Range
): void => {
    if (currentRange) {
        // Two elements do not form a range so split them into 2 single elements
        if (currentRange.count === 2) {
            results.push(buildRange(currentRange.start));
            results.push(buildRange(currentRange.end!));
        } else {
            results.push(currentRange);
        }
    }
    if (currentItemRange) {
        results.push(currentItemRange);
    }
};