curl \
https://api.smash.gg/tournament/desert-melee-4?\
expand[]=event&expand[]=phase | \
json_pp

curl https://api.smash.gg/tournament/desert-melee-4?expand[]=event&expand[]=phase


curl 
https://api.smash.gg/phase_group/desert-melee-4?
expand[]=standing&expand[]=seeds | 
json_pp


1. Get the tournament info i.e.
```
curl -g https://api.smash.gg/tournament/genesis-5?expand[]=event&expand[]=phase&expand[]=phase_group
```
2. In that response, find the "group" id for the corresponding top 8 "phase"
3. Query to get the information about that phase's "group" i.e.
```
curl -g "https://api.smash.gg/phase_group/323872?expand[]=sets&expand[]=entrants&expand[]=standings"
```
4. Find the player's info in that same response

