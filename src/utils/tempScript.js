const firebase = require('firebase')
import { getUserId } from './firebase/auth'

const { database } = firebase

import toArray from 'utils/toArray'

import { writePlayerData } from 'utils/firebase/db'

export function createPlayers() {
  writePlayerData({ tag: 'Mang0' })
  writePlayerData({ tag: 'Armada' })
  writePlayerData({ tag: 'Leffen' })
  writePlayerData({ tag: 'S2J' })
  writePlayerData({ tag: 'Axe' })
  writePlayerData({ tag: 'Hungrybox' })
  writePlayerData({ tag: 'Plup' })
  writePlayerData({ tag: 'SFAT' })
}

export function createTournament() {
  database().ref('players').once('value').then((snapshot) => {
    const players = toArray(snapshot.val())
    const tournament = {
      name: 'Desert Melee 5',
      topEight: {
        winnersSemisTopA: players[0],
        winnersSemisTopB: players[1] ,
        winnersSemisBottomA: players[2] ,
        winnersSemisBottomB: players[3] ,
        prelosersQuartersTopA: players[4] ,
        prelosersQuartersTopB: players[5] ,
        prelosersQuartersBottomA: players[6] ,
        prelosersQuartersBottomB: players[7] ,
      }
    }
    const tournamentRef  = database().ref('tournaments').push()
    debugger
    tournamentRef.set(tournament)
  })
}
