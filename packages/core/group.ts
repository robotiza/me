export interface Group {
    id: string;

    locale: string;

    name: string;

    url: string;
}

export type GroupsLoader = (locale: string) => Promise<Map<string, Group>>;