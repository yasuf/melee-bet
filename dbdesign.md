# DB design

### User table
* id                int
* facebook_token    string
* name              string \*optional
* email             string \*optional

### Bets table
* id                int
* user_id           int  foreign key
* player_id         int  foreign key
* tournament_id     int  foreign key
* points_amount     int

### Players table
* id                int
* gamer_tag         string

### Match table
* id                int
* tournament_id     int  foreign key


### BetsHistory table
* id                int
* amount            int
* player_id         int  foreign key
* opponent_id       int  foreign key
* won_bet           bool \*do we need this?
* tournament_id     int  foreign key

### Tournaments table
* id               int 
* name             string
