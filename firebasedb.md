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
      gamer_tag[String]
    }
  },
  predictions: {
    id: {
      tournament_id[Number],
      player_id[Number],
      user_id[Number]
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
