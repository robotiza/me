import { type Expectedness } from "./event";
import { Scheduled } from "./scheduled";

export type Periodicity = string;

/** An incident refers to an unexpected event often undesirable,
 * that requires attention, response, or investigation.
 */
export interface Periodical extends Omit<Scheduled, 'expectedness'> {
    expectedness: Expectedness.PREIODICAL;

    periodicity?: string;
}