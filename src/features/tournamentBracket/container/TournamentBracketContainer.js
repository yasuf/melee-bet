import React, { Component } from 'react';
import './dashboardContainer.css';
import '../components/bracket.css'

import BracketComponent from '../components/BracketComponent'
import Match from '../components/Match'
import RoundGenerator from '../../common/RoundGenerator'

const fakeData = {
  topEightPlayers: {
    winnersSemisTopA: {
      tag: 'Mango',
      match: 'winnersSemisTop'
    },
    winnersSemisTopB: {
      tag: 'Armada',
      match: 'winnersSemisTop'
    },
    winnersSemisBottomA: {
      tag: 'Hbox',
      match: 'winnersSemisBottom'
    },
    winnersSemisBottomB: {
      tag: 'Leffen',
      match: 'winnersSemisBottom'
    },
    prelosersQuartersTopA: {
      tag: 'Axe',
      match: 'prelosersQuartersTop'
    },
    prelosersQuartersTopB: {
      tag: 'S2J',
      match: 'prelosersQuartersTop'
    },
    prelosersQuartersBottomA: {
      tag: 'Plup',
      match: 'prelosersQuartersBottom'
    },
    prelosersQuartersBottomB: {
      tag: 'SFAT',
      match: 'prelosersQuartersBottom'
    }
  }
}

/*

state = {
  second_round
}

*/

const secondRoundData = [
  { playerTop: { tag: '-', isWinner: true }, playerBottom: { tag: "-", isWinner: false } },
]

const WinnerData = [
  { playerTop: { tag: '-', isWinner: true } }
]

const defaultState = {
  fakeData,
  predictions: {
    winnersSemisTop: {},
    winnersSemisBottom: {},
    prelosersQuartersTop: {},
    prelosersQuartersBottom: {},
  }
}

class TournamentBracketContainer extends Component {

  constructor() {
    super()
    this.state = defaultState
  }

  onPlayerClick = (player) => {
    const { tag } = player
    const { predictions } = this.state
    this.setState({
      predictions: {
        ...predictions,
        [player.match]: { tag }
      }
    })
  }

  mapWinnersFirstRoundData = () => {
    const { fakeData } = this.state
    const { topEightPlayers } = fakeData
    const { 
      winnersSemisTopA,
      winnersSemisTopB,
      winnersSemisBottomA,
      winnersSemisBottomB
      } = topEightPlayers
    return [
      {
        playerTop: winnersSemisTopA,
        playerBottom: winnersSemisTopB
      },
      {
        playerTop: winnersSemisBottomA,
        playerBottom: winnersSemisBottomB
      }
    ]
  }

  mapLosersFirstRoundData = () => {
    const { fakeData } = this.state
    const { topEightPlayers } = fakeData
    const { 
      prelosersQuartersTopA,
      prelosersQuartersTopB,
      prelosersQuartersBottomA,
      prelosersQuartersBottomB,
      } = topEightPlayers
    return [
      {
        playerTop: prelosersQuartersTopA,
        playerBottom: prelosersQuartersTopB
      },
      {
        playerTop: prelosersQuartersBottomA,
        playerBottom: prelosersQuartersBottomB
      }
    ]
  }

  mapWinnersFinalsData = () => {
    const { predictions } = this.state
    return [{
      playerTop: predictions.winnersSemisTop,
      playerBottom: predictions.winnersSemisBottom
    }]
  }

  mapLosersQuartersData = () => {
    const { predictions } = this.state
    return [{
      playerTop: predictions.prelosersQuartersTop,
      playerBottom: predictions.prelosersQuartersBottom
    }]
  }

  mapLosersSemisData = () => {

  }

  render() {
    return (
      <div className="dashboard-container">
        <h2>Predict who you think will win each match!</h2>
        <div className="winners-bracket">
          <main id="tournament">
            <RoundGenerator 
              matches={ this.mapWinnersFirstRoundData() }
              onPlayerClick={ this.onPlayerClick }
            />
            <RoundGenerator 
              matches={ this.mapWinnersFinalsData() }
              onPlayerClick={ this.onPlayerClick }
            />
            <RoundGenerator
              matches={ WinnerData }
              onPlayerClick={ this.onPlayerClick }
            />
          </main>
        </div>
        <div className="losers-bracket">
          <main id="tournament">
            <RoundGenerator 
              matches={ this.mapLosersFirstRoundData() }
              onPlayerClick={ this.onPlayerClick }
            />
            <RoundGenerator 
              matches={ this.mapLosersFirstRoundData() }
              onPlayerClick={ this.onPlayerClick }
            />
            <RoundGenerator 
              matches={ this.mapLosersQuartersData() }
              onPlayerClick={ this.onPlayerClick }
            />
            <RoundGenerator
              matches={ WinnerData }
              onPlayerClick={ this.onPlayerClick }
            />
          </main>
        </div>
      </div>
    );
  }
}

export default TournamentBracketContainer;
