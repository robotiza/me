export interface Profile {
    id: string;
    
    name: string;

    photo: string;
    
    role: string;
    
    team: string;

    url: string;
}

export type ProfilesLoader = (group: string) => Promise<Map<string, Profile>>;