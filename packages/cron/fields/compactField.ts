import { FieldItem } from "./fieldset";
import { Range, buildRange, completeRangeWithItem, finalizeCurrentRange } from "./range";

const compactField = (arr: readonly FieldItem[]): Range[] => {
    const results = [];
    let currentRange: Range | undefined;

    for (let i = 0; i < arr.length; i++) {
        const currentItem = arr[i];
        if (typeof currentItem !== 'number') {
            // String elements can't form a range
            finalizeCurrentRange(results, currentRange, buildRange(currentItem));
            currentRange = undefined;
        } else if (!currentRange) {
            // Start a new range
            currentRange = buildRange(currentItem);
        } else if (currentRange.count === 1) {
            // Guess that the current item starts a range
            completeRangeWithItem(currentRange, currentItem);
        } else {
            if (currentRange.step === currentItem - currentRange.end) {
                // We found another item that matches the current range
                currentRange.count++;
                currentRange.end = currentItem;
            } else if (currentRange.count === 2) { // The current range can't be continued
                // Break the first item of the current range into a single element, and try to start a new range with the second item
                results.push(buildRange(currentRange.start));
                currentRange = buildRange(currentRange.end!);
                completeRangeWithItem(currentRange, currentItem);
            } else {
                // Persist the current range and start a new one with current item
                finalizeCurrentRange(results, currentRange);
                currentRange = buildRange(currentItem);
            }
        }
    }

    finalizeCurrentRange(results, currentRange);

    return results;
}

export default compactField;
