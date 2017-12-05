import React, { Component } from 'react';
import './dashboardContainer.css';
import '../components/bracket.css'

import BracketComponent from '../components/BracketComponent'
import Match from '../components/Match'
import RoundGenerator from '../../common/RoundGenerator'

const defaultState = {}

const fakeRoundData2 = [
  { playerTop: { tag: 'Mango', isWinner: true }, playerBottom: { tag: "Armada", isWinner: false } },
  { playerTop: { tag: 'Mango', isWinner: true }, playerBottom: { tag: "Armada", isWinner: false } },
]

const fakeRoundData3 = [
  { playerTop: { tag: 'Mango', isWinner: true }, playerBottom: { tag: "Armada", isWinner: false } },
]

const fakeRoundData4 = [
  { playerTop: { tag: 'Mango', isWinner: true } },
]

class DashboardContainer extends Component {

  constructor() {
    super()
    this.state = defaultState
  }

  render() {
    return (
      <div className="dashboard-container">
        <h2>Predict who you think will win each match!</h2>
        <div className="winners-bracket">
          <main id="tournament">
            <RoundGenerator 
              matches={ fakeRoundData2 }
            />
            <RoundGenerator 
              matches={ fakeRoundData3 }
            />
            <RoundGenerator
              matches={ fakeRoundData4 }
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
            <RoundGenerator
              matches={ fakeRoundData4 }
            />
          </main>
        </div>
      </div>
    );
  }
}

export default DashboardContainer;
