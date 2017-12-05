import React, { Component } from 'react'
import './ticket-list.css'

import { Link } from 'react-router-dom'

class TicketList extends Component {

  render() {
    return (
      <div>
        <Link to="/tickets/1">Desert Melee 5</Link>
      </div>
    )
  }
}

export default TicketList
