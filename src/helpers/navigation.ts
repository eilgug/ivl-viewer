'use server'

import { redirect } from "next/navigation";

export async function navigate(season: number , teamId: number, territoryId: number, championshipId: number, groupId: number) {
    redirect(`/info?season=${season}&territory=${territoryId}&championship=${championshipId}&group=${groupId}&team=${teamId}`);
}
