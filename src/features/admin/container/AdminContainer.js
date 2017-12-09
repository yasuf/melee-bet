import React, { Component } from 'react'
import './admin-container.css'

import TournamentList from 'features/tickets/components/TournamentList'
import StartTournamentButton from 'features/admin/components/StartTournamentButton'
import TournamentCreator from 'features/admin/components/TournamentCreator'
import TournamentResultsForm from 'features/admin/components/TournamentResultsForm'

class AdminContainer extends Component {

  render() {
    return (
      <div 
        className="admin-panel"
      >
        <h3>Click 'Start Tournament' to mark a tournament as started</h3>
        <TournamentList>
          <StartTournamentButton />
        </TournamentList>
        <TournamentCreator />
        <TournamentResultsForm />
      </div>
    )
  }
}

export default AdminContainer
