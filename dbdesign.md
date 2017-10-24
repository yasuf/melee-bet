# DB design

### User table
* id                int
* facebook_token    string
* name              string \*comes from facebook
* email             string \*comes from facebook

### User points wallet
* id                int
* user_id           int
* amount            int

### Admin table
* id                int
* user_id           int  

### Open Bets table
* id                int
* user_id           int  foreign key
* match_id 2        int  foreign key
* points_amount     int  \* bet amount

### Players table
* id                int
* gamer_tag         string

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
