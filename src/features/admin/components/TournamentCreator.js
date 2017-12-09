import React, { Component } from 'react'
import './TournamentCreator.css'

const bracketPositions = [
  { name: 'Winners Semis Top A', key: 'winnersSemisTopA' },
  { name: 'Winners Semis Top B', key: 'winnersSemisTopB' },
  { name: 'Winners Semis Bottom A', key: 'winnersSemisBottomA' },
  { name: 'Winners Semis Bottom B', key: 'winnersSemisBottomB' },
  { name: 'Prelosers Quarters Top A', key: 'prelosersQuartersTopA' },
  { name: 'Prelosers Quarters Top B', key: 'prelosersQuartersTopB' },
  { name: 'Prelosers Quarters Bottom A', key: 'prelosersQuartersBottomA' },
  { name: 'Prelosers Quarters Bottom B', key: 'prelosersQuartersBottomB' },
]

import { createTournament, retrieveAllPlayers } from 'utils/firebase/db'

class TournamentCreator extends Component {

  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    this.fetchAllPlayers()
  }

  fetchAllPlayers = () => {
    retrieveAllPlayers()
      .then((snap) => {
        const players = snap.val()
        const playersArr = []
        for(var key in players) {
          playersArr.push({ id: key, ...players[key]})
        }
        this.setState({ players: playersArr }) 
      })
  }

  onPlayerChanged = (e, position) => {
    const { players } = this.state
    this.setState({ [position.key]: players[e.target.value] })
  }

  onTournamentNameChange = (e) => {
    this.setState({ tournamentName: e.target.value })
  }

  getTournamentData = () => {
    const {
      winnersSemisTopA,
      winnersSemisTopB,
      winnersSemisBottomA,
      winnersSemisBottomB,
      prelosersQuartersTopA,
      prelosersQuartersTopB,
      prelosersQuartersBottomA,
      prelosersQuartersBottomB,
      tournamentName,
    } = this.state
    return {
      name: tournamentName,
      topEight: {
        winnersSemisTopA,
        winnersSemisTopB,
        winnersSemisBottomA,
        winnersSemisBottomB,
        prelosersQuartersTopA,
        prelosersQuartersTopB,
        prelosersQuartersBottomA,
        prelosersQuartersBottomB,
      }
    }
  }

  createTournament = () => {
    const data = this.getTournamentData()
    debugger
    createTournament(this.getTournamentData())
  }

  render() {
    const { players } = this.state
    return (
      <div 
        className="tournament-creator"
      >
        <h3>
          Create a tournament
        </h3>
        Tournament name: <input type="text" onChange={ this.onTournamentNameChange } />
        <table>
          { 
            bracketPositions.map((position) => {
              return (
                <tr>
                  <td>{ position.name }</td>
                  <td>
                    <select 
                      onChange={ (e) => this.onPlayerChanged(e, position) }
                      name={ position.name }
                    >
                      <option selected>Select..</option>
                      {
                        players && players.map((player, i) => <option value={ i }>{ player.tag }</option> )
                      }
                    </select>
                  </td>
                </tr>
              )
            }) 
          }
          <button onClick={ this.createTournament }>
            Create tournament
          </button>
        </table>
      </div>
    )
  }
}

export default TournamentCreator
