import React, { Component } from 'react'
import './rankings.css'

import { fakeTournamentData } from '../../../utils/firebase/fakeData'

import { writePlayerData, writePlayersData } from '../../../utils/firebase/db'

class Rankings extends Component {

  render() {
    return (
      <div>
        <li>
          <a 
            href="#"
            onClick={ () => { } }
          >
            Top 100
          </a>
        </li>
      </div>
    )
  }
}

export default Rankings
