import React, { Component } from 'react'
import './TournamentResultsForm.css'

import TournamentList from 'features/tickets/components/TournamentList'

import { retrieveAllPlayers, getAllTournaments, submitResults } from 'utils/firebase/db'
import toArray from 'utils/toArray'

const matches = [
  'grandFinals',
  'winnersFinals',
  'winnersSemisTop',
  'winnersSemisBottom',
  'prelosersQuartersTop',
  'losersQuartersTopOpponent',
  'prelosersQuartersBottom',
  'losersQuartersBottomOpponent',
  'losersQuartersTop',
  'losersQuartersBottom',
  'losersSemis',
  'losersFinals',
  'losersFinalsOpponent',
]

class TournamentResultsForm extends Component {

  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    this.fetchAllPlayers()
    this.getTournamentsList()
  }

  onMatchChanged = (e, match) => {
    this.setState({ [match]: e.target.value }, () => {
      console.log(this.state)
    })
  }

  onTournamentChange = (e) => {
    const i = e.target.value
    this.setState({ selectedTournament: i })
  }

  getTournamentsList = () => {
    getAllTournaments().then((snapshot) => {
      const tournaments = toArray(snapshot.val())
      this.setState({ tournaments: tournaments })
    })
  }

  fetchAllPlayers = () => {
    retrieveAllPlayers()
      .then((snap) => {
        const players = toArray(snap.val())
        this.setState({ players })
      })
  }

  submitResults = () => {
    const { players, selectedTournament } = this.state
    const {
      grandFinals,
      winnersFinals,
      winnersSemisTop,
      winnersSemisBottom,
      prelosersQuartersTop,
      prelosersQuartersBottom,
      losersQuartersTop,
      losersQuartersBottom,
      losersSemis,
      losersFinals,
      losersQuartersTopOpponent,
      losersQuartersBottomOpponent,
      losersFinalsOpponent
    } = this.state
    const prediction = {
      grandFinals: players[grandFinals],
      winnersFinals: players[winnersFinals],
      winnersSemisTop: players[winnersSemisTop],
      winnersSemisBottom: players[winnersSemisBottom],
      prelosersQuartersTop: players[prelosersQuartersTop],
      prelosersQuartersBottom: players[prelosersQuartersBottom],
      losersQuartersTop: players[losersQuartersTop],
      losersQuartersBottom: players[losersQuartersBottom],
      losersSemis: players[losersSemis],
      losersFinals: players[losersFinals],
      losersQuartersTopOpponent: players[losersQuartersTopOpponent],
      losersQuartersBottomOpponent: players[losersQuartersBottomOpponent],
      losersFinalsOpponent: players[losersFinalsOpponent]
    }
    const tournamentId = this.state.tournaments[selectedTournament].id
    submitResults(prediction, tournamentId)
  }

  render() {
    const { players, tournaments } = this.state
    if(!players || !tournaments) return null
    return (
      <div 
        className="tournament-creator"
      >
        <h3>
          Submit the tournament results
        </h3>
        For tournament:
          <select
            onChange={ this.onTournamentChange }
          >
            <option>Select...</option>
            {
              tournaments.map((tournament, i) => {
                return <option value={ i }>{ tournament.name }</option>
              })
            }
          </select>
        <table>
         {
            matches.map(match => {
              return (<tr className="match">
                <td>{ match }</td>
                <td>
                  <select onChange={ (e) => this.onMatchChanged(e, match)}>
                    <option selected>Select..</option>
                    {
                      players && players.map((player, i) => {
                        return (<option value={ i }>{ player.tag }</option>)
                      })
                    }
                  </select>
                </td>
              </tr>)
            })
         }
        </table>
        <button onClick={ this.submitResults }>
          Submit results
        </button>
      </div>
    )

  }
}

export default TournamentResultsForm

