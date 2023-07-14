const replaceWithRange = (expression: string, text: string | RegExp, init: string, end: string): string => {
    const numbers = [];
    let last = parseInt(end);
    let first = parseInt(init);

    if(first > last){
        last = parseInt(init);
        first = parseInt(end);
    }

    for(let i = first; i <= last; i++) {
        numbers.push(i);
    }

    return expression.replace(new RegExp(text, 'i'), numbers.join());
}

const convertRange = (expression: string): string => {
    const rangeRegEx = /(\d+)-(\d+)/;
    let match = rangeRegEx.exec(expression);
    while(match !== null && match.length > 0){
        expression = replaceWithRange(expression, match[0], match[1], match[2]);
        match = rangeRegEx.exec(expression);
    }
    return expression;
}

export const convertAllRanges = (expressions: string[]): string[] => {
    for(let i = 0; i < expressions.length; i++){
        expressions[i] = convertRange(expressions[i]);
    }
    return expressions;
}