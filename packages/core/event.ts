/*
1. Expected Events:

* Annual General Meeting: A regularly scheduled meeting held once a year by an organization to discuss important matters with its members or shareholders.
* Birthday Party: A celebration held on a specific date each year to commemorate someone's birth.
* Industry Conference: A recurring event held annually or biennially, bringing together professionals from a specific industry for networking and educational purposes.


2. Unexpected Events:

* Natural Disaster: Unforeseen events such as earthquakes, hurricanes, or floods that occur unexpectedly and have a significant impact on the affected area.
* Emergency Response Drills: Unplanned exercises or simulations conducted to test and improve preparedness for unforeseen emergencies.


3. Periodical Events:

* Weekly Staff Meeting: A regularly scheduled meeting held once a week to update team members, discuss ongoing projects, and address any issues.
* Monthly Book Club: A gathering of individuals who meet once a month to discuss a selected book and share their thoughts and insights.
* Quarterly Sales Review: A review conducted every three months to evaluate sales performance, set targets, and plan strategies for the upcoming period.



These examples demonstrate how events can be categorized based on their expectedness (expected or unexpected) and periodicity (periodical). It's important to note that events can fall into multiple categories, and the specific nature and frequency of events can vary based on individual contexts and industries.
*/
/*
export const PLANNED = 'PLANNED';
export const UNEXPECTED = 'UNEXPECTED';
export const REOCCURING = 'REOCCURING';

export const EXPECTEDNESS = [PLANNED, UNEXPECTED, REOCCURING] as const;
export type Expectedness = typeof EXPECTEDNESS[number];
*/

export enum Expectedness {
    PLANNED = 1, // scheduled once
    PREIODICAL = 3, // scheduled multiple times
    RECURRENT = 2, // not scheduled but expected
    UNEXPECTED = 0, // not scheduled and not expected
}

export interface Event {
    name: string;

    description: string;

    /**
     * 1 Planned Events: These are events that are intentionally organized and scheduled in advance.
     * They are expected to occur at a specific time and location. Examples include conferences,
     * concerts, weddings, and business meetings.
     * 2. Unexpected Events: These are events that occur without prior planning or anticipation.
     * They are typically unanticipated and can include emergencies, accidents, natural disasters,
     * or sudden disruptions. Examples include earthquakes, power outages, or unexpected medical
     * emergencies.
     * 3. Reoccurring Events: These are events that happen repeatedly or at regular intervals. They
     * can be expected due to their periodic nature. Examples include weekly staff meetings, monthly
     * book club gatherings, annual festivals, or seasonal sales.
     */
    expectedness: Expectedness;
}