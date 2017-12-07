## Structure of the data

### Schema
{
  users: {
    id: {
      name[String]
    }
  },
  players: {
    id[Number]: {
      tag[String]
    }
  },
  tournaments: {
    id: {
      tournamentName[String],
      topEight: {
        winnersSemisTopA,
        winnersSemisTopB,
        winnersSemisBottomA,
        winnersSemisBottomB,
        prelosersQuartersTopA,
        prelosersQuartersTopB,
        prelosersQuartersBottomA,
        prelosersQuartersBottomB
      }
    }
  },
  tournamentPlayers: {
    tournament_id: {  
      winnersSemisTopA: { // [TournamentPlayer]
        player_id: 1,
        tag: 'Mang0',
        loserGoesTo: 'losersQuartersTopA',
        match: 'winnerSemisTop'
      },
      winnersSemisTopB,
      winnersSemisBottomA,
      winnersSemisBottomB,
      prelosersQuartersTopA,
      prelosersQuartersTopB,
      prelosersQuartersBottomA,
      prelosersQuartersBottomB
    }
  }
}
  userPredictions: {
    user_id: {
      tournament_id: {
        tournament_id[Number],
        grandFinals[TournamentPlayer],
        winnersFinals[TournamentPlayer],
        winnerSemisTop[TournamentPlayer],
        winnerSemisBottom[TournamentPlayer],
        losersFinals[TournamentPlayer],
        losersSemis[TournamentPlayer],
        losersQuartersTop[TournamentPlayer],
        losersQuartersBottom[TournamentPlayer],
        losersPreQuartersTop[TournamentPlayer],
        losersPreQuartersBottom[TournamentPlayer],
      }
    }
  },
  tournamentPredictionsPerUser: {

  }
}


### Example
```json
users: {
  1: {
    name: 'Yasu Flores'
  }
}

players: {
  "1": {
    "gamer_tag": "Mango"
  }
},

predictions: {
  "1": {
    user_id: 1,
    player_id: 1
  }
}

```
## Prediction defintion

Prediction
  has one tournament
  belongs to a user
  has one winnerSemisTop as Player
  has one winnerSemisTop as Player
  has one winnerSemisTop as Player
  has one winnerSemisTop as Player
  has one winnerSemisTop as Player
  has one winnerSemisTop as Player
  has one winnerSemisTop as Player
  
