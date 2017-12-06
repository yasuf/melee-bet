const firebase = require('firebase')

import { fakeTournamentData } from './fakeData'

const { database } = firebase

export function writePlayerData(player) {
  const { id, data } = player
  database().ref(`players/${id}`).set(data)
}

export function writePlayersData(array) {
  array.forEach((player) => {
    const { id, data } = player
    database().ref(`players/${id}`).set(data)
  })
}

export function createTournament(tournament) {
  const { id, data } = fakeTournamentData
  database().ref(`tournaments/${id}`).set(data)
}

export function retrieveTournamentData(id) {
  return database().ref(`tournaments/${id}`).once('value')
}

export function sendPrediction(prediction) {
  const predictionRef = database().ref(`prediction`).push()
  debugger
  // predictionRef.set(prediction)
  // return database().ref(`prediction`)
}
