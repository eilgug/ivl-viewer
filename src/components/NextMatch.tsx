'use client'
import { getNextMatchInfo } from "@/helpers/match";
import { getSeason } from "@/helpers/season";
import { MatchInfo, TeamInfo } from "@/types";
import { useEffect, useState } from "react";
import { Card, Stack } from "react-bootstrap";

const NextMatch: React.FC<{ teamId: number, groupId: number, season: number }> = ({ teamId, groupId, season }) => {

    const [matchInfo, setMatchInfo] = useState<MatchInfo | null>(null);

    useEffect(() => {
        if (!matchInfo) {
            getNextMatchInfo(getSeason(2023), teamId, groupId).then((matchInfo) => {
                setMatchInfo(matchInfo);
            });
        }
    }, [matchInfo]);

    return (
        <Card className="mt-3 shadow-sm">
            <Card.Body>
                <Card.Title className="text-center">Next Match</Card.Title>
                <CardContent matchInfo={matchInfo} />
            </Card.Body>
        </Card>
    );
}

const CardContent: React.FC<{ matchInfo: MatchInfo | null }> = ({ matchInfo }) => {
    if (matchInfo != null) {
        return (
            <Match matchInfo={matchInfo} />
        );
    } else {
        return (
            <Card.Text className="text-center">
                <i><small>No match scheduled</small></i>
            </Card.Text>
        );
    }
}

const Match: React.FC<{ matchInfo: MatchInfo }> = ({ matchInfo }) => {
    return (
        <div>
            <div className="row row-cols-3 justify-content-around">
                <div className="col text-center">
                    <Team teamInfo={matchInfo.home} />
                </div>
                <div className="col-2 my-auto text-center vs">
                    vs
                </div>
                <div className="col text-center">
                    <Team teamInfo={matchInfo.guest} />
                </div>
            </div>
            <br />
            <Stack>
                <div className="text-center"><small>{matchInfo.date.toLocaleString('it-IT', { day: "2-digit", month: "2-digit", year: "numeric", minute: "2-digit", hour: "2-digit" })}</small></div>
                <div className="text-center"><small>{matchInfo.place}</small></div>
            </Stack>
        </div>
    );
}

const Team: React.FC<{ teamInfo: TeamInfo }> = ({ teamInfo }) => {
    return (
        <Stack gap={3} className="justify-content-between align-items-center h-100">
            <div className="team-name d-flex align-items-center flex-grow-1">
                {teamInfo.name}
            </div>
            <Stack direction="horizontal" gap={3} className="justify-content-center">
                <div><small>Pos. {teamInfo.position}˚</small></div>
                <div className="vr" />
                <div><small>Pts. {teamInfo.points}</small></div>
            </Stack>
        </Stack>
    );
}

export default NextMatch;
