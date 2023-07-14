const isValidateTime = (dataArray: string[], value: number): boolean =>
    dataArray.every((element) =>
        parseInt(element) >= 0 && parseInt(element) <= value
    );

const TIME_ERROR_MSG = 'Minute and Second values must be between 0 and 59 and Hour Values must be between 0 and 23';


export const isValidTimeValue = (time: string, val: number): [boolean, ...string[]] => {
    if (time === '*' || time === "0") {
        return [true];
    }

    const errors: string[] = [];

    if (time.includes('/')) {
        let startingSecOptionArr = time.split('/');
        if (!isValidateTime(startingSecOptionArr, val) && startingSecOptionArr[0] !== '*') {
            errors.push(TIME_ERROR_MSG);
        }
        return [isValidateTime(startingSecOptionArr, val) || (startingSecOptionArr[0] === '*' && isValidateTime([startingSecOptionArr[1]], val)), ...errors];
    }

    if (time.includes('-')) {
        if (time.includes(',')) {
            let multiSecArr = time.split(',');
            let values = multiSecArr.filter(e => !e.includes('-'))
            let timegap = multiSecArr.filter(e => e.includes('-'))
            let timegapArr = timegap.join('-').split('-')
            let combineArr = values.concat(timegapArr)

            if (!isValidateTime(combineArr, val)) {
                errors.push(TIME_ERROR_MSG);
            }
            return [isValidateTime(combineArr, val), ...errors];
        }

        let secRangeArr = time.split('-');
        if (!isValidateTime(secRangeArr, val)) {
            errors.push(TIME_ERROR_MSG);
        }
        return [isValidateTime(secRangeArr, val), ...errors];
    }

    if (time.includes(',')) {
        let multiSecArr = time.split(',');
        if (!isValidateTime(multiSecArr, val)) {
            errors.push(TIME_ERROR_MSG);
        }
        return [isValidateTime(multiSecArr, val), ...errors];
    }

    if (parseInt(time) >= 0 && parseInt(time) <= val) {
        return [true];
    }
    return [false, TIME_ERROR_MSG];
};