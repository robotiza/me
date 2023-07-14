const MIN_YEAR = 1970;
const MAX_YEAR = 2099;

const DAY_OF_WEEK_ERROR_MSG_1 = 'Day-of-Week values must be between 1 and 7';
const DAY_OF_WEEK_ERROR_MSG_2 = 'Day-of-Week values must be SUN, MON, TUE, WED, THU, FRI, SAT OR between 1 and 7, - * ? / L #';
const DAY_OF_WEEK_ERROR_MSG_3 = '(Day of week) - Unsupported value for field. Possible values are 1-7 or SUN-SAT , - * ? / L #';
const DAY_OF_WEEK_ERROR_MSG_4 = 'A numeric value between 1 and 5 must follow the # option';

const DAY_OF_MONTH_ERROR_MSG_1 = 'Day of month values must be between 1 and 31';
const DAY_OF_MONTH_ERROR_MSG_2 = 'Offset from last day must be <= 30';


const YEAR_ERROR_MSG = 'Start year must be less than stop year';
const YEAR_UNSUPPORT_VAL_ERROR_MSG = '(Year) - Unsupported value for field. Possible values are 1970-2099 , - * /';

const TIME_ERROR_MSG = 'Minute and Second values must be between 0 and 59 and Hour Values must be between 0 and 23';

const DAY_OF_MONTH_DAY_OF_WEEK_ERROR_MSG = '? can only be specfied for Day-of-Month -OR- Day-of-Week';

const UNEXPECTED_ERROR_MSG = 'Unexpected end of expression';

export const isValidateYear = (yearArr: string[]): boolean => {
    return yearArr.every(function (year) {
        return parseInt(year) >= MIN_YEAR && parseInt(year) <= MAX_YEAR;
    })
};

export const isValidYearValue = (year: string): [boolean, ...string[]] => {
    if (year === '*') {
        return [true];
    }

    const errors: string[] = [];
    
    if (year.includes('/')) {
        let startingYearOptionArr = year.split('/');
        let validYear = isValidateYear([startingYearOptionArr[0]]);
        let validRepeatOccurrence = parseInt(startingYearOptionArr[1]) >= 0 && parseInt(startingYearOptionArr[1]) <= 129;
        
        if (!validYear) {
            errors.push('(Year) - Unsupported value ' + startingYearOptionArr[0] + ' for field. Possible values are 1970-2099 , - * /');
        }
        
        if (!validRepeatOccurrence) {
            errors.push('(Year) - Expression ' + startingYearOptionArr[1] + ' is not a valid increment value. Accepted values are 0-129');
        }

        return [validYear && validRepeatOccurrence, ...errors];
    }
    
    if (year.includes('-')) {
        let yearRangeArr = year.split('-');
        let validYear = isValidateYear(yearRangeArr);
        let validRange = parseInt(yearRangeArr[0]) <= parseInt(yearRangeArr[1]);
        
        if (!validYear) {
            errors.push('(Year) - Unsupported value ' + yearRangeArr[0] + ' for field. Possible values are 1970-2099 , - * /');
        }
        
        if (!validRange) {
            errors.push(YEAR_ERROR_MSG);
        }

        return [validYear && validRange, ...errors];
    }

    if (year.includes(',')) {
        let multiYearArr = year.split(',');

        if (!isValidateYear(multiYearArr)) {
            return [false, YEAR_UNSUPPORT_VAL_ERROR_MSG];
        }
        return [true];
    }
    
    if (parseInt(year) < MIN_YEAR || parseInt(year) > MAX_YEAR) {
        return [false, YEAR_UNSUPPORT_VAL_ERROR_MSG];
    }
    
    return [true];
};