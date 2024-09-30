'use client'
import { getSeason } from "@/helpers/season";
import { getStandings } from "@/helpers/standing";
import { StandingInfo } from "@/types";
import { useEffect, useState } from "react";
import { Card, ListGroup, Stack } from "react-bootstrap";

const Standing: React.FC<{ season: number, groupId: number }> = ({ season, groupId }) => {

    const [standing, setStanding] = useState<StandingInfo[] | null>(null);

    useEffect(() => {
        if (!standing) {
            getStandings(getSeason(season), groupId).then((standing) => {
                setStanding(standing);
            });
        }
    }, [standing]);

    return (
        <Card className="mt-3 shadow-sm">
            <Card.Body>
                <Card.Title className="text-center">Leaderboard</Card.Title>
                <CardContent standing={standing} />
            </Card.Body>
        </Card>
    );
}

const CardContent: React.FC<{ standing: StandingInfo[] | null }> = ({ standing }) => {
    if (standing != null) {
        return (
            <div>
                <Podium standing={standing} />
                <Ladder standing={standing} />
            </div>
        );
    } else {
        return (
            <Card.Text className="text-center">
                <i><small>No standings info</small></i>
            </Card.Text>
        );
    }
}

const Podium: React.FC<{ standing: StandingInfo[] }> = ({ standing }) => {
    return (
        <div className="row row-cols-3 align-items-end">
            <div className="col">
                <Block
                    medal={'🥈'}
                    name={standing[1].name}
                    points={standing[1].points}
                    height={75}
                    color="silver"
                />
            </div>
            <div className="col">
                <Block
                    medal={'🥇'}
                    name={standing[0].name}
                    points={standing[0].points}
                    height={100}
                    color="gold"
                />
            </div>
            <div className="col">
                <Block
                    medal={'🥉'}
                    name={standing[2].name}
                    points={standing[2].points}
                    height={50}
                    color="brown"
                />
            </div>
        </div>
    );
};

const Ladder: React.FC<{ standing: StandingInfo[] }> = ({ standing }) => {
    return (
        <ListGroup>
            {/* skip first 3 element */}
            {standing.slice(3).map((team, index) => {
                return (
                    <ListGroup.Item key={index + 4}>
                        <Stack direction="horizontal" gap={1} className="justify-content-between">
                            <div className="truncate-text">{team.name}</div>
                            <div className="ms-auto p-2">{team.points}</div>
                        </Stack>
                    </ListGroup.Item>
                );
            })}
        </ListGroup>
    );
}

const Block: React.FC<{ medal: string, name: string, points: number, height: number, color: string }> = ({ medal, name, points, height, color }) => {
    return (
        <Stack className="align-items-center m-0">
            <div className="text-center">{medal}</div>
            <p className="m-0"><small>{points} pt.</small></p>
            <div className="text-center d-flex flex-column justify-content-center p-1 rounded shadow-sm"
                style={{ height: height, width: '100%', backgroundColor: color }} >
            </div>
            <div className="text-center d-flex flex-column justify-content-center p-1"
                style={{ width: '100%' }} >
                <div className="truncate-text" style={{ color: 'black', fontSize: '0.7rem' }}>{name}</div>

            </div>
        </Stack>
    );
}


export default Standing;
