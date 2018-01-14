const topEightService = require('../topEightService')
const _ = require('underscore')

const SMASH_GG_MELEE_GAME_ID = 1;
const MELEE_SINGLES_EVENT_ID = 4;

const fakeEvents = [
  { id: 1, videogameId: 2, name: 'Smash 4 Singles'},
  { id: 2, videogameId: 2, name: 'Smash 4 Doubles'},
  { id: 3, videogameId: SMASH_GG_MELEE_GAME_ID, name: 'Melee Doubles' },
  { id: MELEE_SINGLES_EVENT_ID, videogameId: SMASH_GG_MELEE_GAME_ID, name: 'Melee Singles' }
]
describe('topEightService', () => {
  describe('getMeleeEvent', () => {
    it('returns the event that corresponds to Melee Singles', () => {
      expect(topEightService.getMeleeSinglesEvent(fakeEvents).id).toBe(MELEE_SINGLES_EVENT_ID)
    })
  })

  describe('getTopEightPhase', () => {
    const fakePhases = [
      { id: 1, eventId: MELEE_SINGLES_EVENT_ID, name: 'Pools Round 1' },
      { id: 2, eventId: MELEE_SINGLES_EVENT_ID, name: 'Top 8'}
    ]
    const meleeSinglesEvent = fakeEvents[3]
    it('returns the correct phase', () => {
      expect(topEightService.getTopEightPhase(fakePhases, meleeSinglesEvent).id).toBe(2)
    })
  })

  describe('getPhaseGroups', () => {
    const fakePhase = { id: 3, name: 'Top 8' }
    const fakeGroups = [
      { id: 1, phaseId: 1 },
      { id: 2, phaseId: 1 },
      { id: 3, phaseId: 2 },
      { id: 4, phaseId: 3 },
      { id: 5, phaseId: 3 }
    ]
    it('returns all the groups related to that phase', () => {
      const groups = topEightService.getPhaseGroups(fakeGroups, fakePhase)
      expect(_.pluck(groups, 'id')).toEqual([4,5])
    })
  })

  describe('formatResults', () => {
    const fakePlayers = [
      { id: 1, name: 'Mango', entrantId: 1 },
      { id: 2, name: 'Armada', entrantId: 2 },
      { id: 3, name: 'Leffen', entrantId: 3 },
    ]
    const fakeSets = [
      { id: 1, entrant1Id: 1, entrant2Id: 2 },
      { id: 2, entrant1Id: 1, entrant2Id: 3 },
    ]
    const fakeEntrants = [
      { id: 1, playerId: 1 },
      { id: 2, playerId: 2 },
      { id: 3, playerId: 3 },
    ]
    const expectedFormat = [
      { 
        set: fakeSets[0],
        player1: fakePlayers[0],
        player2: fakePlayers[1],
        entrant1: fakeEntrants[0],
        entrant2: fakeEntrants[1],
      },
      {
        set: fakeSets[1],
        player1: fakePlayers[0],
        player2: fakePlayers[2],
        entrant1: fakeEntrants[0],
        entrant2: fakeEntrants[2],
      }
    ]
    const formattedResults = topEightService.formatResults(fakePlayers, fakeSets, fakeEntrants)
    expect(formattedResults).toEqual(expectedFormat)
  })
})
