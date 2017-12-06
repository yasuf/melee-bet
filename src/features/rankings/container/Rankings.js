import React, { Component } from 'react'
import './rankings.css'

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
              createTournament()
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
