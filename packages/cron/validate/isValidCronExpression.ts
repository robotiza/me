import { isValidDayOfMonthValue, isValidMonthValue } from "../month";
import { isValidTimeValue } from "../time";
import { isValidDayOfWeekValue } from "../week";
import { isValidYearValue } from "../year";

const UNEXPECTED_ERROR_MSG = 'Unexpected end of expression';
const MAX_MIN_SEC_VALUE = 59;
const MAX_HOUR_VALUE = 23;

const isValidCronExpression = <T extends boolean>(expression: string): [boolean, ...string[]] => {
    if (!/\s/g.test(expression)) {
        return [false, UNEXPECTED_ERROR_MSG];
    }

    const cronArray = expression.split(' ');

    if (cronArray.length !== 6 && cronArray.length !== 7) {
        return [false, UNEXPECTED_ERROR_MSG];
    }

    const seconds = cronArray[0].trim();
    const minutes = cronArray[1].trim();
    const hours = cronArray[2].trim();
    const dayOfMonth = cronArray[3].trim();
    const month = cronArray[4].trim();
    const dayOfWeek = cronArray[5].trim();
    const year = cronArray[6] ? cronArray[6].trim() : null;

    return [
        isValidTimeValue(seconds, MAX_MIN_SEC_VALUE),
        isValidTimeValue(minutes, MAX_MIN_SEC_VALUE),
        isValidTimeValue(hours, MAX_HOUR_VALUE),
        isValidDayOfMonthValue(dayOfMonth, dayOfWeek),
        isValidMonthValue(month),
        isValidDayOfWeekValue(dayOfWeek, dayOfMonth),

    ].reduce(
        ([valid0, ...errors0], [valid, ...errors]) => [valid0 && valid, ...errors0, ...errors],
        year ? isValidYearValue(year) : [true]
    );
}

export default isValidCronExpression;