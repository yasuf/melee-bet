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
    }
  },
  tournamentPlayers: {
    tournament_id: {  
      winnersSemisTopA: {
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
  predictions: {
    id: {
      tournament_id[Number],
      player_id[Number],
      user_id[Number],
      winnerSemisTop[Number], //player id
      winnerSemisBottom[Number], //player id
      winnersFinals[Number], //player id
      winnersPreQuartersTop[Number], //player id
      winnersPreQuartersBottom[Number], //player id
      winnersQuartersTop[Number], //player id
      winnersQuartersBottom[Number], //player id
      losersSemis[Number], //player id
      losersFinals[Number], //player id
      grandFinals[Number], //player id
    }
  },

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
