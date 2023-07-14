import { type Incident } from "./incident";
import { type Periodical } from "./periodical";
import { type Scheduled } from "./scheduled";

export type Occurrence = Incident | Periodical | Scheduled;