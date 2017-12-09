import React, { Component } from 'react'
import './ticket-list.css'

import { Link } from 'react-router-dom'

import { getAllTournaments } from 'utils/firebase/db'
import toArray from 'utils/toArray'

class TicketList extends Component {

  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    this.getTournamentsList()
  }

  getTournamentsList = () => {
    getAllTournaments().then((snapshot) => {
      const tournaments = toArray(snapshot.val())
      this.setState({ tournaments: tournaments })
    })
  }

  render() {
    const { tournaments } = this.state
    if(!tournaments) return null
    return (
      <div className="ticket-container">
        {
          tournaments.map((tournament) => {
            return <Link className="ticket" to={ `/tickets/${tournament.id}` }>{ tournament.name }</Link>
          })
        }
      </div>
    )
  }
}

export default TicketList
