const firebase = require('firebase')

import { getUserId } from './auth'

const { database } = firebase

export function fetchAdmins() {
  return database().ref('admins').once('value')
}

export function createPlayer(playerData) {
  const playerRef = database().ref('players').push()
  playerRef.set(playerData)
}

export function writePlayersData(array) {
  array.forEach((player) => {
    const { id, data } = player
    database().ref(`players/${id}`).set(data)
  })
}

export function retrieveAllPlayers() {
  return database().ref('players').once('value')
}

export function createTournament(tournament) {
  const tournamentRef = database().ref('tournaments').push()
  tournamentRef.set(tournament)
}

export function startTournament(id) {
  const tournamentRef = database().ref(`tournaments/${id}`)
  tournamentRef.once('value')
    .then((snap) => {
      const tournamentData = snap.val()
      const newTournamentData = {
        ...tournamentData,
        tournamentStarted: true
      }
      tournamentRef.set(newTournamentData)
    })
}

export function retrieveTournamentData(id) {
  return database().ref(`tournaments/${id}`).once('value')
}

export function retrieveTournamentResults(id) {
  return database().ref(`tournamentResults/${id}`).once('value')
}

export function createTournamentResults(id, results) {
  const ref = database().ref(`tournamentResults/${id}`).push()
  ref.set(results)
}

export function getAllTournaments() {
  return database().ref(`tournaments`).once('value')
}

export function retrieveUserPrediction(tournamentId) {
  return database().ref(`userPrediction/${ getUserId() }/${tournamentId}`).once('value')
}

export function sendPrediction(prediction, tournamentId) {
  const userPredictionRef = database().ref(`userPrediction/${ getUserId() }/${ tournamentId }`)
  userPredictionRef.set(prediction)
}

export function submitResults(results, tournamentId) {
  const resultRef = database().ref(`tournamentResults/${tournamentId}`).push()
  resultRef.set(results)
}
