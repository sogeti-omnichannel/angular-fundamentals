import { Match } from './match/match';
import { Player } from './player/player';

export const MATCHES: Match[] = [
    {
        "player1name": "Emiel",
        "player1score": 8,
        "player2name": "Jurgen",
        "player2score": 10,
        "id": "r1m16r-jz",
        "date": new Date("2018-04-01T19:10:12.618Z")
    },
    {
        "player1name": "Jurgen",
        "player1score": 7,
        "player2name": "Emiel",
        "player2score": 10,
        "id": "SkaJTSWsG",
        "date": new Date("2018-04-02T18:50:12.586Z")
    },
    {
        "player1name": "Emiel",
        "player1score": 10,
        "player2name": "Jurgen",
        "player2score": 8,
        "id": "r1Dg6r-jM",
        "date": new Date("2018-04-03T18:04:22.750Z")
    }
];

export const PLAYERS: Player[] = [
    {
        "id": "rJlQk6HZiG",
        "name": "emiel",
        "points": 6,
        "wins": 2,
        "losses": 1,
        "draws": 0,
        "for": 28,
        "against": 25,
        "difference": 3
    },
    {
        "id": "Hy-7k6S-jz",
        "name": "jurgen",
        "points": 3,
        "wins": 1,
        "losses": 2,
        "draws": 0,
        "for": 25,
        "against": 28,
        "difference": -3
    }
]