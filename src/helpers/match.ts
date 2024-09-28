'use server';
import { getMatchsDataFromApi, getStandingsFromApi, MatchAPI } from "@/services/api"
import { MatchInfo, Season, StandingInfo } from "@/types"
import { getTeamStandingInfoByName } from "./standing";

export const getNextMatchInfo = async (season: Season, teamId: number, groupId: number, territoryId: number | null = null, championshipId: number | null = null): Promise<MatchInfo | null> => {
    // set season start date from today
    season.start = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const matchDataFromApi = await getMatchsDataFromApi(season, teamId, territoryId, championshipId, groupId, 1);
    if (matchDataFromApi.length === 0) {
        return null;
    }

    const standingsFromApi = await getStandingsFromApi(season, groupId);

    const homeStandingInfo = getTeamStandingInfoByName(matchDataFromApi[0].squadra_casa_name, standingsFromApi);
    const guestStandingInfo = getTeamStandingInfoByName(matchDataFromApi[0].squadra_ospite_name, standingsFromApi);

    const matchInfo: MatchInfo | null = convertMatchApiToMatchInfo(matchDataFromApi[0], homeStandingInfo, guestStandingInfo);
    return matchInfo;
}

function convertMatchApiToMatchInfo(matchDataFromApi: MatchAPI, homeStandingInfo: StandingInfo, guestStandingInfo: StandingInfo): MatchInfo {
    return {
        date: new Date(matchDataFromApi.DataGioco.replace(' ', 'T')),
        place: `${matchDataFromApi.Palestra} - ${matchDataFromApi.Palestra_indirizzo}`,
        home: {
            name: matchDataFromApi.squadra_casa_name,
            logo: matchDataFromApi.squadra_casa_logo,
            position: homeStandingInfo.position,
            points: homeStandingInfo.points
        },
        guest: {
            name: matchDataFromApi.squadra_ospite_name,
            logo: matchDataFromApi.squadra_ospite_logo,
            position: guestStandingInfo.position,
            points: guestStandingInfo.points
        }
    }
}
