import React, { Component } from 'react'
import './tournament-list.css'

import { Link } from 'react-router-dom'

import { getAllTournaments } from 'utils/firebase/db'
import { toArray } from 'utils/toArray'

class TournamentList extends Component {

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
    const { props } = this
    const { tournaments } = this.state
    const { children } = this.props
    if(!tournaments) return null
    return (
      <li className="tournaments-list">
        {
          tournaments.map((tournament) => {
            return React.cloneElement(children, { ...props, tournament })
          })
        }
      </li>
    )
  }
}

export default TournamentList
