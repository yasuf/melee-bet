import React, { Component } from 'react';
import './dashboardContainer.css';
import '../components/bracket.css'

import BracketComponent from '../components/BracketComponent'
import Match from '../components/Match'
import RoundGenerator from '../../common/RoundGenerator'
import Sidebar from '../../sidebar/components/Sidebar.js'

const defaultState = {}

const fakeRoundData2 = [
  { playerTop: { tag: 'Mango', isWinner: true }, playerBottom: { tag: "Armada", isWinner: false } },
  { playerTop: { tag: 'Mango', isWinner: true }, playerBottom: { tag: "Armada", isWinner: false } },
]

const fakeRoundData3 = [
  { playerTop: { tag: 'Mango', isWinner: true }, playerBottom: { tag: "Armada", isWinner: false } },
]

class DashboardContainer extends Component {

  constructor() {
    super()
    this.state = defaultState
  }

  render() {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <h2>Predict who you think will in each match!</h2>
        <div className="winners-bracket">
          <main id="tournament">
            <RoundGenerator 
              matches={ fakeRoundData2 }
            />
            <RoundGenerator 
              matches={ fakeRoundData3 }
            />
          </main>
        </div>
        <div className="losers-bracket">
          <main id="tournament">
            <RoundGenerator 
              matches={ fakeRoundData2 }
            />
            <RoundGenerator 
              matches={ fakeRoundData3 }
            />
          </main>
        </div>
      </div>
    );
  }
}

export default DashboardContainer;
