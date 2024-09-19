import { Season } from "@/types";

export const getSeason = (startYear: number): Season => {
    return {
        start: `${startYear}-09-01`,
        end: `${startYear + 1}-08-31`
    }
}

export const getCurrentSeason = (): number => {
    const today = new Date();
    let currentSeason: number;
    if (today.getMonth() < 8) {
        currentSeason = today.getFullYear() - 1;
    } else {
        currentSeason = today.getFullYear();
    }
    return currentSeason;
}

export const getAllSeasonsOptions = (startFrom: number): Option[] => {
    const options: Option[] = [];
    const currentSeason: number = getCurrentSeason();
    for (let i = startFrom; i <= currentSeason; i++) {
        options.push({ id: i, label: `${i} - ${i + 1}` });
    }
    return options;
}
