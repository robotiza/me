import { type Event, type Expectedness } from "./event";

export interface Scheduled extends Omit<Event, 'expectedness'> {
    expectedness: Expectedness.PLANNED;

    /** Date */
    since: string;

    /** Time */
    time: string;

    /** Timespan */
    timespan: string;

    /** Timezone */
    timezone: string;
}