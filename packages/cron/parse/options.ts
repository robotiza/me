import { CronDate } from "../date";

export type DateType = Date | number | string;

export interface ParserOptions {
    currentDate?: DateType | CronDate
    startDate?: DateType
    endDate?: DateType
    utc?: boolean
    tz?: string
    nthDayOfWeek?: number
}