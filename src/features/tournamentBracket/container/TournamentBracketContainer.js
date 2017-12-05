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
      match: 'winnersSemisTop',
      loserGoesTo: 'losersQuartersTopA'
    },
    winnersSemisTopB: {
      tag: 'Armada',
      match: 'winnersSemisTop',
      loserGoesTo: 'losersQuartersTopA'
    },
    winnersSemisBottomA: {
      tag: 'Hbox',
      match: 'winnersSemisBottom',
      loserGoesTo: 'losersQuartersBottomA'
    },
    winnersSemisBottomB: {
      tag: 'Leffen',
      match: 'winnersSemisBottom',
      loserGoesTo: 'losersQuartersBottomA'
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
    winnerFinals: {},
    losersFinals: {},
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

  onPlayerClick = (player, opponent) => {
    const { tag } = player
    const { predictions } = this.state
    this.setState({
      predictions: {
        ...predictions,
        [player.match]: { tag },
        [opponent.loserGoesTo]: { tag: opponent.tag }
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

  mapGrandfinalsData = () => {
    const { predictions } = this.state
    return [{
      playerTop: predictions.winnersFinals,
      playerBottom: predictions.losersFinals
    }]
  }

  mapWinnersFinalsData = () => {
    const { predictions } = this.state
    return [{
      playerTop: { ...predictions.winnersSemisTop, match: 'winnersFinals', loserGoesTo: 'losersFinalsBottom' },
      playerBottom: { ...predictions.winnersSemisBottom, match: 'winnersFinals', loserGoesTo: 'losersFinalsBottom' }
    }]
  }

  mapLosersQuartersData = () => {
    const { predictions } = this.state
    return [
      {
        playerTop: { ...predictions.losersQuartersTopA, match: 'losersQuartersTop' },
        playerBottom: { ...predictions.prelosersQuartersTop, match: 'losersQuartersTop' }
      },
      {
        playerTop: { ...predictions.losersQuartersBottomA, match: 'losersQuartersBottom' },
        playerBottom: { ...predictions.prelosersQuartersBottom, match: 'losersQuartersBottom' }
      }
    ]
  }

  mapLosersSemisData = () => {
    const { predictions } = this.state
    return [{
      playerTop: { ...predictions.losersQuartersTop, match: 'losersSemis' },
      playerBottom: { ...predictions.losersQuartersBottom, match: 'losersSemis' }
    }] 
  }

  mapLosersFinalsData = () => {
    const { predictions } = this.state
    return [{
      playerTop: { ...predictions.losersSemis, match: 'losersFinals' },
      playerBottom: { ...predictions.losersFinalsBottom, match: 'losersFinals' }
    }]
  }

  // mapLosersFinalsData = () => {
  //   const { predictions } = this.state
  //   return [{
  //     playerTop: { ...predictions.losersSemisA },
  //     playerBottom: {}
  //   }]
  // }

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
              matches={ this.mapGrandfinalsData() }
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
              matches={ this.mapLosersQuartersData() }
              onPlayerClick={ this.onPlayerClick }
            />
            <RoundGenerator
              matches={ this.mapLosersSemisData() }
              onPlayerClick={ this.onPlayerClick }
            />
            <RoundGenerator
              matches={ this.mapLosersFinalsData() }
              onPlayerClick={ this.onPlayerClick }
            />
          </main>
        </div>
      </div>
    );
  }
}

export default TournamentBracketContainer;
