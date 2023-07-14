export const convertSteps = (expressions: string[]): string[] => {
    const stepValuePattern = /^(.+)\/(\w+)$/;
    for (let i = 0; i < expressions.length; i++) {
        const match = stepValuePattern.exec(expressions[i]);
        const isStepValue = match !== null && match.length > 0;
        if (isStepValue) {
            const baseDivider = match[2];
            if (isNaN(Number(baseDivider))) {
                throw baseDivider + ' is not a valid step value';
            }
            const values = match[1].split(',');
            const stepValues = [];
            const divider = parseInt(baseDivider, 10);
            for (let j = 0; j <= values.length; j++) {
                const value = parseInt(values[j], 10);
                if (value % divider === 0) {
                    stepValues.push(value);
                }
            }
            expressions[i] = stepValues.join(',');
        }
    }
    return expressions;
}