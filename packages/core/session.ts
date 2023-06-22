export interface Session {
    id: string;

    date: string;

    file: string;

    // seconds
    length: number;

    // time
    since: string;

    // if missing it is live
    until?: string;

    url: string;
}

export type SessionsLoader = (group: string, since: string) => Promise<Map<string, Session>>;