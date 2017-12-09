import React, { Component } from 'react'
import './admin-container.css'

import TournamentList from 'features/tickets/components/TournamentList'
import StartTournamentButton from 'features/admin/components/StartTournamentButton'
import TournamentCreator from 'features/admin/components/TournamentCreator'

class AdminContainer extends Component {

  render() {
    return (
      <div 
        className="admin-panel"
      >
        <h3>Click 'Start Tournament' to mark a tournament as started</h3>
        <TournamentList alert={ () => { alert('yolo') } }>
          <StartTournamentButton />
        </TournamentList>
        <TournamentCreator />
      </div>
    )
  }
}

export default AdminContainer
