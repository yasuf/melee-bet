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
      loserGoesTo: 'losersQuartersBottomA'
    },
    prelosersQuartersTopA: {
      tag: 'Axe',
      match: 'prelosersQuartersTop'
    },
    prelosersQuartersTopB: {
      tag: 'S2J',
      match: 'prelosersQuartersTop'
    },
    prelosersQuartersBottomA: {
      tag: 'Plup',
      match: 'prelosersQuartersBottom'
    },
    prelosersQuartersBottomB: {
      tag: 'SFAT',
      match: 'prelosersQuartersBottom'
    }
  }
}
