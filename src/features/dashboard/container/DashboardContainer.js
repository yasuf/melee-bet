import React, { Component } from 'react';
import './dashboardContainer.css';
import '../components/bracket.css'

import BracketComponent from '../components/BracketComponent'
import Match from '../components/Match'
import RoundGenerator from '../../common/RoundGenerator'

const defaultState = {}

const fakeRoundData = [
  { playerTop: { tag: 'Mango', isWinner: true }, playerBottom: { tag: "Armada", isWinner: false } },
  { playerTop: { tag: 'Mango', isWinner: true }, playerBottom: { tag: "Armada", isWinner: false } },
  { playerTop: { tag: 'Mango', isWinner: true }, playerBottom: { tag: "Armada", isWinner: false } },
  { playerTop: { tag: 'Mango', isWinner: true }, playerBottom: { tag: "Armada", isWinner: false } }
]
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
        <main id="tournament">
          <RoundGenerator 
            matches={ fakeRoundData2 }
          />
          <RoundGenerator 
            matches={ fakeRoundData3 }
          />
          
        </main>
      </div>
    );
  }
}

export default DashboardContainer;
