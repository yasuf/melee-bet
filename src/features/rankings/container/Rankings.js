import React, { Component } from 'react'
import './rankings.css'

import { fakeTournamentData } from '../../../utils/firebase/fakeData'

import { writePlayerData, writePlayersData, createTournament } from '../../../utils/firebase/db'

const mango = {
  id: 1,
  data: {
    tag: 'Mang0'
  }
}

class Rankings extends Component {

  render() {
    return (
      <div>
        <li>
          <a 
            href="#"
            onClick={ () => {
              createTournament(fakeTournamentData)
            } }
          >
            Top 100
          </a>
        </li>
      </div>
    )
  }
}

export default Rankings
