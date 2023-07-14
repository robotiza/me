import { CronExpression } from "./CronSchedule";


export interface IStringResult {
    variables: Record<string, string>,
    expressions: CronExpression[],
    errors: Record<string, any>,
}

export type StringResult = IStringResult;
/*
export function parseExpression<IsIterable extends boolean = false>(expression: string, options?: ParserOptions): CronExpression;

export function fieldsToExpression<IsIterable extends boolean = false>(fields: CronFields, options?: ParserOptions): CronExpression;

export function parseFile(filePath: string, callback: (err: any, data: StringResult) => any): void;

export function parseString(data: string): StringResult;
*/
