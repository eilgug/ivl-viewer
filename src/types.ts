export type Option = {
    id: number;
    label: string;
}

export type DropdownMenuProps = {
    options: Option[];
    defaultLabel: string;
}

export type Season = {
    start: string;
    end: string;
}

export type TeamInfo = {
    name: string;
    logo: string;
    position: number;
    points: number;
}

export type MatchInfo = {
    date: Date;
    place: string;
    home: TeamInfo;
    guest: TeamInfo;
}

export type StandingInfo = {
    position: number;
    points: number;
    name: string;
}
