import { CronDate } from "../date";
import { ReadonlyCronFields } from "../fields/fieldset";

export interface DstRange {
    start?: number;
    end?: number;
}

type FnName = 'addMonth' | 'addDay' | 'addHour' | 'addMinute' | 'addSecond' | 'subtractMonth' | 'subtractDay' | 'subtractHour' | 'subtractMinute' | 'subtractSecond'

export const fnName = (
    dateMathVerb: 'add' | 'subtract',
    method: 'Month' | 'Day' | 'Hour' | 'Minute' | 'Second'
): FnName => <FnName>(dateMathVerb + method);

const applyTimezoneShift = (
    fields: ReadonlyCronFields,
    dst: DstRange,
    currentDate: CronDate,
    dateMathVerb: 'add' | 'subtract',
    method: 'Month' | 'Day' | 'Hour' | 'Minute' | 'Second'
): void => {
    if ((method === 'Month') || (method === 'Day')) {
        const prevTime = currentDate.getTime();
        currentDate[fnName(dateMathVerb, method)]();
        const currTime = currentDate.getTime();
        if (prevTime === currTime) {
            // Jumped into a not existent date due to a DST transition
            if ((currentDate.getMinutes() === 0) &&
                (currentDate.getSeconds() === 0)) {
                currentDate.addHour();
            } else if ((currentDate.getMinutes() === 59) &&
                (currentDate.getSeconds() === 59)) {
                currentDate.subtractHour();
            }
        }
    } else {
        const previousHour = currentDate.getHours();
        currentDate[fnName(dateMathVerb, method)]();
        const currentHour = currentDate.getHours();
        const diff = currentHour - previousHour;
        if (diff === 2) {
            // Starting DST
            if (fields.hour.length !== 24) {
                // Hour is specified
                dst.start = currentHour;
            }
        } else if ((diff === 0) &&
            (currentDate.getMinutes() === 0) &&
            (currentDate.getSeconds() === 0)) {
            // Ending DST
            if (fields.hour.length !== 24) {
                // Hour is specified
                dst.end = currentHour;
            }
        }
    }
};

export default applyTimezoneShift;