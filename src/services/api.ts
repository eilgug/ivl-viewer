'use server'
import { Season } from "@/types";
import { RestManager } from "@/utils/restManager"

const restClient = new RestManager('https://ivl.usacli.it');
const endpoints = {
    GET_TERRITORY_PUBLIC: '/ListaTerritoriPubblica',
    GET_CHAMPIONSHIP_DATA: '/CampionatiData',
    GET_MATCHS_DATA: '/PartiteData',
    GET_STANDINGS: '/Classifica',
    GET_GROUP: '/GironiData',
    GET_TEAM_FROM_CHAMPIONSHIP: '/SquadreIscritteACampionato',
    GET_TEAM_FROM_GROUP: '/SquadreIscritteAGirone',
};

export type TerritoryAPI = { id: number; name: string;[key: string]: any }
export type ChampionshipAPI = { id: number; name: string;[key: string]: any }
export type GroupAPI = { id: number; name: string;[key: string]: any }
export type TeamAPI = { id: number; name: string;[key: string]: any }
export type MatchAPI = { id: number;[key: string]: any }
export type StandingsAPI = { name: string; Punteggio:number, [key: string]: any }

export const getTerritoriesFromApi = (): Promise<TerritoryAPI[]> => {
    return restClient.get(endpoints.GET_TERRITORY_PUBLIC, { headers: { 'withCredentials': 'true' } });
}

export const getChampionshipsFromApi = (season: Season, territoryId?: number): Promise<ChampionshipAPI[]> => {
    return restClient.get(endpoints.GET_CHAMPIONSHIP_DATA, { params: { territorio_id: territoryId, inizio_stagione: season.start, fine_stagione: season.end } });
}

export const getGroupFromApi = (season: Season, territoryId?: number, championshipId?: number): Promise<GroupAPI[]> => {
    return restClient.get(endpoints.GET_GROUP, { params: { territorio_id: territoryId, campionato_id: championshipId, inizio_stagione: season.start, fine_stagione: season.end } });
}

export const getTeamFromApiByGroup = (groupId?: number): Promise<TeamAPI[]> => {
    return restClient.get(`${endpoints.GET_TEAM_FROM_GROUP}/${groupId}`);
}

export const getMatchsDataFromApi = (season: Season, teamId: number, territoryId: number | null = null, championshipId: number | null = null, groupId: number | null = null, limit: number | null = null): Promise<MatchAPI[]> => {
    return restClient.get(endpoints.GET_MATCHS_DATA, { params: { squadra_id: teamId, territorio_id: territoryId, campionato_id: championshipId, girone_id: groupId, inizio_stagione: season.start, fine_stagione: season.end, limit: limit } });
}

export const getStandingsFromApi = (season: Season, groupId: number): Promise<StandingsAPI[]> => {
    return restClient.get(`${endpoints.GET_STANDINGS}/${groupId}`, { params: { inizio_stagione: season.start, fine_stagione: season.end } });
}
