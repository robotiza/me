import { type Event, type Expectedness } from "./event";

/** An incident refers to an unexpected event often undesirable,
 * that requires attention, response, or investigation.
 */
export interface Incident extends Omit<Event, 'expectedness'> {
    expectedness: Expectedness.UNEXPECTED;

    level: number;
}