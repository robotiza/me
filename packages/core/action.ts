export interface Action {
    id: string;

    // profile
    actor: string;

    // in seconds
    length: number;

    // in seconds
    offset: number;

    // source
    session: string;

    // publish
    twitter: string;

    // publish
    youtube: string;
}

export type PollLoader = (profile: string, since: string) => Promise<Map<string, Action>>;