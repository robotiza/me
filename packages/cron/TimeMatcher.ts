import validatePattern from "./pattern-validation";
import { interprete } from "./";
import match from "./match";
import { offset } from "./timezone";

export class TimeMatcher {
    expressions: string[];

    constructor(private pattern: string, private timezone: string) {
        validatePattern(pattern);
        this.expressions = interprete(pattern);
    }

    match(date: Date) {
        return match(this.expressions, this.apply(date));
    }

    apply(date: Date) {
        if (this.timezone) {
            return offset(date, this.timezone);
        }

        return date;
    }
}