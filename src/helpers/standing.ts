import { StandingsAPI } from "@/services/api";
import { StandingInfo } from "@/types";

export function getTeamStandingInfoByName(name: string, standings: StandingsAPI[]): StandingInfo {
    const index = standings.findIndex((standing) => standing.name === name);
    if (index === -1) {
        return {
            position: index + 1,
            points: 0
        }
    }
    return {
        position: index + 1,
        points: standings[index].Punteggio
    }
}
