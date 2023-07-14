
import { DateTime } from "luxon";

export class CronDate {
    _date: DateTime;

    constructor(timestamp?: CronDate | Date | number | string, tz?: string) {
        const dateOpts = { zone: tz };
        if (!timestamp) {
            this._date = DateTime.local();
        } else if (timestamp instanceof CronDate) {
            this._date = timestamp._date;
        } else if (timestamp instanceof Date) {
            this._date = DateTime.fromJSDate(timestamp, dateOpts);
        } else if (typeof timestamp === 'number') {
            this._date = DateTime.fromMillis(timestamp, dateOpts);
        } else if (typeof timestamp === 'string') {
            this._date = DateTime.fromISO(timestamp, dateOpts);
            this._date.isValid || (this._date = DateTime.fromRFC2822(timestamp, dateOpts));
            this._date.isValid || (this._date = DateTime.fromSQL(timestamp, dateOpts));
            // RFC2822-like format without the required timezone offset (used in tests)
            this._date.isValid || (this._date = DateTime.fromFormat(timestamp, 'EEE, d MMM yyyy HH:mm:ss', dateOpts));
        } else {
            throw new Error('CronDate: unhandled timestamp: ' + JSON.stringify(timestamp));
        }

        if (!this._date.isValid) {
            throw new Error('CronDate: unhandled timestamp: ' + JSON.stringify(timestamp));
        }

        if (tz && tz !== this._date.zoneName) {
            this._date = this._date.setZone(tz);
        }
    }

    addYear(): void {
        this._date = this._date.plus({ years: 1 });
    };

    addMonth(): void {
        this._date = this._date.plus({ months: 1 }).startOf('month');
    };

    addDay(): void {
        this._date = this._date.plus({ days: 1 }).startOf('day');
    };

    addHour(): void {
        const prev = this._date;
        this._date = this._date.plus({ hours: 1 }).startOf('hour');
        if (this._date <= prev) {
            this._date = this._date.plus({ hours: 1 });
        }
    };

    addMinute(): void {
        const prev = this._date;
        this._date = this._date.plus({ minutes: 1 }).startOf('minute');
        if (this._date < prev) {
            this._date = this._date.plus({ hours: 1 });
        }
    };

    addSecond(): void {
        const prev = this._date;
        this._date = this._date.plus({ seconds: 1 }).startOf('second');
        if (this._date < prev) {
            this._date = this._date.plus({ hours: 1 });
        }
    };

    subtractYear(): void {
        this._date = this._date.minus({ years: 1 });
    };

    subtractMonth(): void {
        this._date = this._date
            .minus({ months: 1 })
            .endOf('month')
            .startOf('second');
    };

    subtractDay(): void {
        this._date = this._date
            .minus({ days: 1 })
            .endOf('day')
            .startOf('second');
    };

    subtractHour(): void {
        const prev = this._date;
        this._date = this._date
            .minus({ hours: 1 })
            .endOf('hour')
            .startOf('second');
        if (this._date >= prev) {
            this._date = this._date.minus({ hours: 1 });
        }
    };

    subtractMinute(): void {
        const prev = this._date;
        this._date = this._date.minus({ minutes: 1 })
            .endOf('minute')
            .startOf('second');
        if (this._date > prev) {
            this._date = this._date.minus({ hours: 1 });
        }
    };

    subtractSecond(): void {
        const prev = this._date;
        this._date = this._date
            .minus({ seconds: 1 })
            .startOf('second');
        if (this._date > prev) {
            this._date = this._date.minus({ hours: 1 });
        }
    };

    getDate(): number {
        return this._date.day;
    };

    getFullYear(): number {
        return this._date.year;
    };

    getDay(): number {
        const weekday = this._date.weekday;
        return weekday == 7 ? 0 : weekday;
    };

    getMonth(): number {
        return this._date.month - 1;
    };

    getHours(): number {
        return this._date.hour;
    };

    getMinutes(): number {
        return this._date.minute;
    };

    getSeconds(): number {
        return this._date.second;
    };

    getMilliseconds(): number {
        return this._date.millisecond;
    };

    getTime(): number {
        return this._date.valueOf();
    };

    getUTCDate(): number {
        return this._getUTC().day;
    };

    getUTCFullYear(): number {
        return this._getUTC().year;
    };

    getUTCDay(): number {
        const weekday = this._getUTC().weekday;
        return weekday == 7 ? 0 : weekday;
    };

    getUTCMonth(): number {
        return this._getUTC().month - 1;
    };

    getUTCHours(): number {
        return this._getUTC().hour;
    };

    getUTCMinutes(): number {
        return this._getUTC().minute;
    };

    getUTCSeconds(): number {
        return this._getUTC().second;
    };

    toISOString(): string | null {
        return this._date.toUTC().toISO();
    };

    toJSON(): string | null {
        return this._date.toJSON();
    };

    setDate(d: number): void {
        this._date = this._date.set({ day: d });
    };

    setFullYear(y: number): void {
        this._date = this._date.set({ year: y });
    };

    setDay(d: number): void {
        this._date = this._date.set({ weekday: d });
    };

    setMonth(m: number): void {
        this._date = this._date.set({ month: m + 1 });
    };

    setHours(h: number): void {
        this._date = this._date.set({ hour: h });
    };

    setMinutes(m: number): void {
        this._date = this._date.set({ minute: m });
    };

    setSeconds(s: number): void {
        this._date = this._date.set({ second: s });
    };

    setMilliseconds(s: number): void {
        this._date = this._date.set({ millisecond: s });
    };

    _getUTC(): DateTime {
        return this._date.toUTC();
    };

    toString(): string {
        return this.toDate().toString();
    };

    toDate(): Date {
        return this._date.toJSDate();
    };

    isLastDayOfMonth(): boolean {
        //next day
        const newDate = this._date.plus({ days: 1 }).startOf('day');
        return this._date.month !== newDate.month;
    };

    /**
     * Returns true when the current weekday is the last occurrence of this weekday
     * for the present month.
     */
    isLastWeekdayOfMonth(): boolean {
        // Check this by adding 7 days to the current date and seeing if it's
        // a different month
        const newDate = this._date.plus({ days: 7 }).startOf('day');
        return this._date.month !== newDate.month;
    };
}