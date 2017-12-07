import React, { Component } from 'react';
import './dashboardContainer.css';
import '../components/bracket.css'

import BracketComponent from '../components/BracketComponent'
import Match from '../components/Match'
import RoundGenerator from '../../common/RoundGenerator'

import { retrieveTournamentData, sendPrediction } from '../../../utils/firebase/db'

const secondRoundData = [
  { playerTop: { tag: '-', isWinner: true }, playerBottom: { tag: "-", isWinner: false } },
]

const WinnerData = [
  { playerTop: { tag: '-', isWinner: true } }
]

const defaultState = {
  predictions: {
    winnersFinals: {},
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
    const { id } = this.props.match.params
    retrieveTournamentData(id)
      .then(snap => {
        const tournament = snap.val()
        this.setState({ tournamentData: tournament })
      })
  }

  onSendPrediction = () => {
    const tournamentId = this.props.match.params.id
    const { tournamentData, predictions } = this.state
    const {
      grandFinals,
      winnersFinals,
      winnersSemisTop,
      winnersSemisBottom,
      prelosersQuartersTop,
      prelosersQuartersBottom,
      losersQuartersTop,
      losersQuartersBottom,
      losersSemis,
      losersFinals
    } = predictions
    const prediction = {
      grandFinals,
      winnersFinals,
      winnersSemisTop,
      winnersSemisBottom,
      prelosersQuartersTop,
      prelosersQuartersBottom,
      losersQuartersTop,
      losersQuartersBottom,
      losersSemis,
      losersFinals
    }
    sendPrediction(prediction, tournamentId)
  }

  onPlayerClick = (player, opponent) => {
    const { tag } = player
    const { predictions } = this.state
    this.setState({
      predictions: {
        ...predictions,
        [player.match]: { tag, id: player.id  },
        [opponent.loserGoesTo]: { tag: opponent.tag, id: opponent.id }
      }
    })
  }

  mapWinnersFirstRoundData = () => {
    const { tournamentData } = this.state
    const { topEight } = tournamentData
    const { 
      winnersSemisTopA,
      winnersSemisTopB,
      winnersSemisBottomA,
      winnersSemisBottomB
      } = topEight
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
    const { topEight } = tournamentData
    const { 
      prelosersQuartersTopA,
      prelosersQuartersTopB,
      prelosersQuartersBottomA,
      prelosersQuartersBottomB,
      } = topEight
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
      playerTop: { ...predictions.winnersFinals, match: 'grandFinals' },
      playerBottom: { ...predictions.losersFinals, match: 'grandFinals' }
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

  mapFirstPlace = () => {
    const { predictions } = this.state
    return [{
      playerTop: { ...predictions.grandFinals, match: 'grandFinals' },
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
            <RoundGenerator
              matches={ this.mapFirstPlace() }
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
          <button onClick={ this.onSendPrediction }>Send Prediction</button>
        </div>
      </div>
    );
  }
}

export default TournamentBracketContainer;
