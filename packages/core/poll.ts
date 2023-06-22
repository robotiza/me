export interface Poll {
    id: string;

    action: string;

    negative: number;

    neutral: number;

    positive: number;

    url: string;
}

export type PollLoader = (profile: string, since: string) => Promise<Map<string, Poll>>;