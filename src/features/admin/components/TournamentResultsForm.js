import React, { Component } from 'react'
import './TournamentResultsForm.css'

import TournamentList from 'features/tickets/components/TournamentList'

import { retrieveAllPlayers, getAllTournaments, sendPrediction } from 'utils/firebase/db'
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
    const tournamentId = this.props.match.params.id
    const { tournamentData, predictions } = this.state
    const {
      losersQuartersTopA,
      losersQuartersBottomA,
      losersFinalsBottom
    } = predictions
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
    } = predictions
    const prediction = {
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
    }
    sendPrediction(prediction, tournamentId)
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
          <select>
            {
              tournaments.map((tournament) => {
                return <option>{ tournament.name }</option>
              })
            }
          </select>
        <table>
         {
            matches.map(match => {
              return (<tr className="match">
                <td>{ match }   </td>
                <td>
                  <select>
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
        <button onClick={ this.createTournament }>
          Submit results
        </button>
      </div>
    )

  }
}

export default TournamentResultsForm

