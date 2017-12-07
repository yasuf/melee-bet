const firebase = require('firebase')

import { getUserId } from './auth'

const { database } = firebase

export function writePlayerData(playerData) {
  const playerRef = database().ref('players').push()
  playerRef.set(playerData)
}

export function writePlayersData(array) {
  array.forEach((player) => {
    const { id, data } = player
    database().ref(`players/${id}`).set(data)
  })
}

export function createTournament(tournament) {
  const tournamentRef  = database().ref('tournaments').push()
  tournamentRef.set(tournament)
}

export function retrieveTournamentData(id) {
  return database().ref(`tournaments/${id}`).once('value')
}

export function getAllTournaments() {
  return database().ref(`tournaments`).once('value')
}

export function retrieveUserPrediction(id) {
  return database().ref(`userPrediction/${ getUserId() }`)
}

export function sendPrediction(prediction, tournamentId) {
  const userPredictionRef = database().ref(`userPrediction/${ getUserId() }/${ tournamentId }`)
  userPredictionRef.set(prediction)
}

