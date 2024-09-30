'use server'
import { getStandingsFromApi, StandingsAPI } from "@/services/api";
import { Season, StandingInfo } from "@/types";

export async function getTeamStandingInfoByName(name: string, standings: StandingsAPI[]): Promise<StandingInfo> {
    const index = standings.findIndex((standing) => standing.name === name);
    if (index === -1) {
        return {
            position: index + 1,
            points: 0,
            name: ''
        }
    }
    return {
        position: index + 1,
        points: standings[index].Punteggio,
        name: name
    }
}

export async function getStandings(season: Season, groupId: number): Promise<StandingInfo[]> {
    const standingsFromAPI = await getStandingsFromApi(season, groupId);
    const standings: StandingInfo[] = standingsFromAPI.map((standing) => {
        return {
            position: standing.Posizione,
            points: standing.Punteggio,
            name: standing.name
        } as StandingInfo;
    });

    return standings.sort((a, b) => b.points - a.points);
}
