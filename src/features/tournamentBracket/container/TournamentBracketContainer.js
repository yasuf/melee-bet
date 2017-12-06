import React, { Component } from 'react';
import './dashboardContainer.css';
import '../components/bracket.css'

import BracketComponent from '../components/BracketComponent'
import Match from '../components/Match'
import RoundGenerator from '../../common/RoundGenerator'

import { retrieveTournamentData } from '../../../utils/firebase/db'

const fakeData = {
  topEightPlayers: {
    winnersSemisTopA: {
      tag: 'Mango',
      match: 'winnersSemisTop',
      loserGoesTo: 'losersQuartersTopA',
      id: 1
    },
    winnersSemisTopB: {
      tag: 'Armada',
      match: 'winnersSemisTop',
      loserGoesTo: 'losersQuartersTopA',
      id: 2
    },
    winnersSemisBottomA: {
      tag: 'Hbox',
      match: 'winnersSemisBottom',
      loserGoesTo: 'losersQuartersBottomA',
      id: 3
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

  componentWillMount() {
    retrieveTournamentData(1)
      .then(snap => {
        const tournament = snap.val()
        this.setState({ tournamentData: tournament })
      })
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
    const { tournamentData } = this.state
    const { 
      winnersSemisTopA,
      winnersSemisTopB,
      winnersSemisBottomA,
      winnersSemisBottomB
      } = tournamentData
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
    const { tournamentData } = this.state
    const { 
      prelosersQuartersTopA,
      prelosersQuartersTopB,
      prelosersQuartersBottomA,
      prelosersQuartersBottomB,
      } = tournamentData
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

  render() {
    if(!this.state.tournamentData) return null
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
