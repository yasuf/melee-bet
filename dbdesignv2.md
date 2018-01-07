# DB design

### User table
* id                int
* facebook          string
* tokens            string
* email             string

### Players table
* id                int
* gamer_tag         string

### User points wallet
* id                int
* user_id           int  foreign key
* amount            int

### Admin table
* id                int
* user_id           int  foreign key

### Open Bets table
* id                int
* user_id           int  foreign key
* match_id          int  foreign key
* points_amount     int  \* bet amount

### Match table
* id                int
* tournament_id     int  foreign key
* player1_id        int  foreign key
* player2_id        int  foreign key
* winner_id         int  foreign key

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
