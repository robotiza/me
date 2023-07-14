const matchPattern = (pattern: string, value: number): boolean => {
    if (pattern.indexOf(',') !== -1) {
        const patterns = pattern.split(',');
        return patterns.indexOf(value.toString()) !== -1;
    }
    return pattern === value.toString();
}

const match = (expressions: string[], date: Date) => {
    const runOnSecond = matchPattern(expressions[0], date.getSeconds());
    const runOnMinute = matchPattern(expressions[1], date.getMinutes());
    const runOnHour = matchPattern(expressions[2], date.getHours());
    const runOnDay = matchPattern(expressions[3], date.getDate());
    const runOnMonth = matchPattern(expressions[4], date.getMonth() + 1);
    const runOnWeekDay = matchPattern(expressions[5], date.getDay());

    return runOnSecond && runOnMinute && runOnHour && runOnDay && runOnMonth && runOnWeekDay;
};

export default match;