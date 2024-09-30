'use client'
import React, { Suspense } from "react";
import NextMatch from "@/components/NextMatch";
import { useSearchParams } from "next/navigation";
import Standing from "@/components/Standing";

const InfoPage: React.FC = async () => {
    const searchParams = useSearchParams();

    const season: number = parseInt(searchParams.get("season") as string);
    // const territoryId: number = parseInt(searchParams.get("territory") as string);
    // const championshipId: number = parseInt(searchParams.get("championship") as string);
    const groupId: number = parseInt(searchParams.get("group") as string);
    const teamId: number = parseInt(searchParams.get("team") as string);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="container vh-100">
                <main>
                    <div className="my-3">
                        <NextMatch teamId={teamId} groupId={groupId} season={season} />
                        <Standing season={season} groupId={groupId} />
                    </div>
                </main>
            </div>
        </Suspense>
    );
}

export default InfoPage;
