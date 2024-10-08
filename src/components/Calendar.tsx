'use client'
import { getMatches } from "@/helpers/match";
import { getSeason } from "@/helpers/season";
import { MatchInfo } from "@/types";
import { useEffect, useState } from "react";
import { Card, ListGroup, Stack } from "react-bootstrap";

const Calendar: React.FC<{ season: number, groupId: number, teamId: number }> = ({ season, groupId, teamId }) => {

    const [calendar, setCalendar] = useState<MatchInfo[] | null>(null);

    useEffect(() => {
        if (!calendar) {
            getMatches(getSeason(season), groupId, teamId).then((calendar) => {
                setCalendar(calendar);
            });
        }
    }, [calendar]);

    return (
        <Card className="mt-3 shadow-sm">
            <Card.Body>
                <Card.Title className="text-center">Calendario</Card.Title>
                <CardContent standing={calendar} />
            </Card.Body>
        </Card>
    );
}

const CardContent: React.FC<{ standing: MatchInfo[] | null }> = ({ standing }) => {
    if (standing != null) {
        return (
            <div>
                <Matches calendar={standing} />
            </div>
        );
    } else {
        return (
            <Card.Text className="text-center">
                <i><small>No calendar info</small></i>
            </Card.Text>
        );
    }
}

const Matches: React.FC<{ calendar: MatchInfo[] }> = ({ calendar }) => {
    return (
        <ListGroup>
            {calendar.map((match, index) => {
                return (
                    <ListGroup.Item key={index}>
                        <div className="row justify-content-between align-items-center text-center h-100">
                            <div className="col team-name" style={{ color: 'black', fontSize: '0.7rem' }}>{match.home.name}</div>
                            <div className="col team-name" style={{ color: 'black', fontSize: '0.7rem' }}>{match.guest.name}</div>
                        </div>
                        <Stack className="justify-content-around text-center">
                            <div style={{ color: 'black', fontSize: '0.7rem' }}>{match.date.toLocaleString('it-IT', { day: "2-digit", month: "2-digit", year: "numeric", minute: "2-digit", hour: "2-digit" })}</div>
                            <div style={{ color: 'black', fontSize: '0.7rem' }}>{match.place}</div>
                        </Stack>
                    </ListGroup.Item>
                );
            })}
        </ListGroup>
    );
}

export default Calendar;
