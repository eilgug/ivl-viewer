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
