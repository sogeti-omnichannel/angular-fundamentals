const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const _ = require('lodash');

const adapter = new FileSync('db.json');
const db = low(adapter);
const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
  });

app.get('/api/match', (req, res) => {
    let matches = db.get('matches');
    res.send(matches);
});

app.post('/api/match', (req, res) => {
    var match = req.body;
    match.id = shortid.generate();
    match.player1name.toLowerCase();
    match.player2name.toLowerCase();
    match.date = new Date();

    db.get('matches')
        .push(match)
        .write();

    // extract players and add them as well
    updatePlayer(match.player1name, match.player1score, match.player2score);
    updatePlayer(match.player2name, match.player2score, match.player1score);

    res.send(match);
});

app.put('/api/match/:id', (req, res) => {
    let match = db.get('matches')
         .find({ id: req.params.id })
         .value();

    // Delete this match stats from the current players
    removeMatchForPlayer(match.player1name, match.player1score, match.player2score);
    removeMatchForPlayer(match.player2name, match.player2score, match.player1score);

    // Write new stats for the new players
    updatePlayer(req.body.player1name, req.body.player1score, req.body.player2score);
    updatePlayer(req.body.player2name, req.body.player2score, req.body.player1score);

    // Update match
    let m = db.get('matches')
        .find({ id: req.params.id })
        .assign(req.body)
        .write();

    res.send(m);
});

app.get('/api/match/:id', (req, res) => {
    res.send(db.get('matches')
        .find({ id: req.params.id })
        .value());
});

app.get('/api/player', (req, res) => {
    let players = db.get('players').value();

    players = _.orderBy(players, ['points', 'difference', 'for'], ['desc', 'desc', 'desc']);
    
    res.send(players);
})

app.listen(8080, () => console.log('Backend listening to port 8080'))

const updatePlayer = (playerName, playerScore, opponentScore) => {
    playerScore = Number(playerScore);
    opponentScore = Number(opponentScore);
    let p = db.get('players')
        .find({ name: playerName.toLowerCase() })
        .value();

    if (p) {
        p.wins += playerScore > opponentScore ? 1 : 0;
        p.points += playerScore > opponentScore ? 3 : 0;
        p.losses += playerScore < opponentScore ? 1 : 0;
        p.draws += playerScore == opponentScore ? 1 : 0;
        p.points += playerScore == opponentScore ? 1 : 0;
        p.for += playerScore;
        p.against += opponentScore;
        p.difference += playerScore - opponentScore;

        db.get('players')
            .find({ name: playerName.toLowerCase() })
            .assign(p)
            .write();
    } else {
        let pObj = {
            id: shortid.generate(),
            name: playerName.toLowerCase()
        }
        pObj.points = 0;
        pObj.wins = playerScore > opponentScore ? 1 : 0;
        pObj.points += playerScore > opponentScore ? 3 : 0;
        pObj.losses = playerScore < opponentScore ? 1 : 0;
        pObj.draws = playerScore == opponentScore ? 1 : 0;
        pObj.points += playerScore == opponentScore ? 1 : 0;
        pObj.for = playerScore;
        pObj.against = opponentScore;
        pObj.difference = playerScore - opponentScore;

        db.get('players')
            .push(pObj)
            .write();
    }
};

const removeMatchForPlayer = (playerName, playerScore, opponentScore) => {
    playerScore = Number(playerScore);
    opponentScore = Number(opponentScore);
    
    let p = db.get('players')
        .find({ name: playerName.toLowerCase() })
        .value();
    
    p.wins -= playerScore > opponentScore ? 1 : 0;
    p.points -= playerScore > opponentScore ? 3 : 0;
    p.losses -= playerScore < opponentScore ? 1 : 0;
    p.draws -= playerScore == opponentScore ? 1 : 0;
    p.points -= playerScore == opponentScore ? 1 : 0;
    p.for -= playerScore;
    p.against -= opponentScore;
    p.difference -= playerScore - opponentScore;

    db.get('players')
        .find({ name: playerName.toLowerCase() })
        .assign(p)
        .write();
}

// Set some defaults
db.defaults({ players: [], matches: [] })
  .write();
