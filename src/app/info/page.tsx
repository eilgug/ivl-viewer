'use client'
import React, { Suspense } from "react";
import NextMatch from "@/components/NextMatch";
import { useSearchParams } from "next/navigation";
import Standing from "@/components/Standing";
import Calendar from "@/components/Calendar";

const InfoPageContent: React.FC = () => {
    const searchParams = useSearchParams();

    const season: number = parseInt(searchParams.get("season") || "0", 0);
    // const territoryId: number = parseInt(searchParams.get("territory") as string);
    // const championshipId: number = parseInt(searchParams.get("championship") as string);
    const groupId: number = parseInt(searchParams.get("group") || "0", 0);
    const teamId: number = parseInt(searchParams.get("team") || "0", 0);

    return (
        <div className="container vh-100">
            <main>
                <div className="my-3">
                    <NextMatch teamId={teamId} groupId={groupId} season={season} />
                    <Standing season={season} groupId={groupId} />
                    <Calendar season={season} groupId={groupId} teamId={teamId} />
                </div>
            </main>
        </div>
    );
}

const InfoPage: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading page...</div>}>
            <InfoPageContent />
        </Suspense>
    );
};

export default InfoPage;
