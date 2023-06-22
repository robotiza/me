export interface Team {
    id: string;

    group: string;

    name: string;

    url: string;
}

export type TeamsLoader = (group: string) => Promise<Map<string, Team>>;