# DB design

### User table
* id                int
* facebook_token    string
* name              string \*comes from facebook
* email             string \*comes from facebook

### Predictions table
* id                int
* user_id           int //user who made the prediction
* entrant_id        int //smash.gg's entrantId
* set_id            int //smash.gg's setId

### Admin table
* id                int
* user_id           int  

### Tournament_cubes table
* id                int
* user_id           int
* tournament_id     int // smash.gg's tournament_id
* count             int // Number of cubes

### Tournaments table
* id
* tournament_id     int // smash.gg's tournament_id
* name              string // smash.gg's name
* status            int // active, finished

### BetsHistory table
* id                int
* amount            int  
* player_id         int  foreign key
* opponent_id       int  foreign key
* won_bet           bool \*do we need this?
* tournament_id     int  foreign key
