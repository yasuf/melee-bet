import React, { Component } from 'react'
import './start-tournament-button.css'

import { startTournament } from 'utils/firebase/db'

class StartTournamentButton extends Component {

  startTournament = () => {
    debugger
    const { tournament } = this.props
    startTournament(tournament.id)
  }

  render() {
    const { alert, tournament } = this.props 
    return (
      <li
        className="start-tournament"
      >
          { tournament.name }
          <button onClick={ this.startTournament }>Start tournament</button>
      </li>  
    )
  }
}

export default StartTournamentButton

