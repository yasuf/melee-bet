const mango = {
  id: 1,
  data: {
    tag: 'Mang0'
  }
}

const players = [
  { id: 2, data: { tag: 'Armada' } },
  { id: 3, data: { tag: 'Leffen' } },
  { id: 4, data: { tag: 'Hbox' } },
  { id: 5, data: { tag: 'S2J' } },
  { id: 6, data: { tag: 'Axe' } },
  { id: 7, data: { tag: 'Plup' } },
  { id: 8, data: { tag: 'SFAT' } },
]

export const fakeTournamentData = {
  id: 1,
  data: {
    name: 'Desert Melee 5',
    topEight: {
      winnersSemisTopA: { 
        tag: 'Mango',
        match: 'winnersSemisTop',
        loserGoesTo: 'losersQuartersTopA',
        id: 1
      },
      winnersSemisTopB: {
        tag: 'Armada',
        match: 'winnersSemisTop',
        loserGoesTo: 'losersQuartersTopA',
        id: 2
      },
      winnersSemisBottomA: {
        tag: 'Hbox',
        match: 'winnersSemisBottom',
        loserGoesTo: 'losersQuartersBottomA',
        id: 3
      },
      winnersSemisBottomB: {
        tag: 'Leffen',
        match: 'winnersSemisBottom',
        loserGoesTo: 'losersQuartersBottomA',
        id: 4
      },
      prelosersQuartersTopA: {
        tag: 'Axe',
        match: 'prelosersQuartersTop',
        id: 5
      },
      prelosersQuartersTopB: {
        tag: 'S2J',
        match: 'prelosersQuartersTop',
        id: 6
      },
      prelosersQuartersBottomA: {
        tag: 'Plup',
        match: 'prelosersQuartersBottom',
        id: 7
      },
      prelosersQuartersBottomB: {
        tag: 'SFAT',
        match: 'prelosersQuartersBottom',
        id: 8
      }
    }
  }
}
