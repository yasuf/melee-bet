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
        let tournament = snap.val()
        tournament = this.populateMatchData(tournament)
        this.setState({ tournamentData: tournament })
      })
  }

  populateMatchData = (tournamentData) => {
    let { 
      winnersSemisTopA,
      winnersSemisTopB,
      winnersSemisBottomA,
      winnersSemisBottomB,
      prelosersQuartersTopA,
      prelosersQuartersTopB,
      prelosersQuartersBottomA,
      prelosersQuartersBottomB
    } = tournamentData.topEight
    winnersSemisTopA = { ...winnersSemisTopA, match: 'winnersSemisTop', loserGoesTo: 'losersQuartersTopA' }
    winnersSemisTopB = { ...winnersSemisTopB, match: 'winnersSemisTop', loserGoesTo: 'losersQuartersTopA' }
    winnersSemisBottomA = { ...winnersSemisBottomA, match: 'winnersSemisBottom', loserGoesTo: 'losersQuartersBottomA' }
    winnersSemisBottomB = { ...winnersSemisBottomB, match: 'winnersSemisBottom', loserGoesTo: 'losersQuartersBottomA' }
    prelosersQuartersTopA = { ...prelosersQuartersTopA, match: 'prelosersQuartersTop' }
    prelosersQuartersTopB = { ...prelosersQuartersTopB, match: 'prelosersQuartersTop' }
    prelosersQuartersBottomA = { ...prelosersQuartersBottomA, match: 'prelosersQuartersBottom' }
    prelosersQuartersBottomB = { ...prelosersQuartersBottomB, match: 'prelosersQuartersBottom' }
    return {
      winnersSemisTopA,
      winnersSemisTopB,
      winnersSemisBottomA,
      winnersSemisBottomB,
      prelosersQuartersTopA,
      prelosersQuartersTopB,
      prelosersQuartersBottomA,
      prelosersQuartersBottomB,
    }
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

  onRemovePrediction = (match) => {
    const { predictions } = this.state
    this.setState({
      predictions: {
        ...predictions,
        [match]: null
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
    debugger
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
              onRemovePrediction={ this.onRemovePrediction }
            />
            <RoundGenerator 
              matches={ this.mapWinnersFinalsData() }
              onPlayerClick={ this.onPlayerClick }
              onRemovePrediction={ this.onRemovePrediction }
            />
            <RoundGenerator
              matches={ this.mapGrandfinalsData() }
              onPlayerClick={ this.onPlayerClick }
              onRemovePrediction={ this.onRemovePrediction }
            />
            <RoundGenerator
              matches={ this.mapFirstPlace() }
              onRemovePrediction={ this.onRemovePrediction }
            />
          </main>
        </div>
        <div className="losers-bracket">
          <main id="tournament">
            <RoundGenerator 
              matches={ this.mapLosersFirstRoundData() }
              onPlayerClick={ this.onPlayerClick }
              onRemovePrediction={ this.onRemovePrediction }
            />
            <RoundGenerator 
              matches={ this.mapLosersQuartersData() }
              onPlayerClick={ this.onPlayerClick }
              onRemovePrediction={ this.onRemovePrediction }
            />
            <RoundGenerator
              matches={ this.mapLosersSemisData() }
              onPlayerClick={ this.onPlayerClick }
              onRemovePrediction={ this.onRemovePrediction }
            />
            <RoundGenerator
              matches={ this.mapLosersFinalsData() }
              onPlayerClick={ this.onPlayerClick }
              onRemovePrediction={ this.onRemovePrediction }
            />
          </main>
          <button onClick={ this.onSendPrediction }>Send Prediction</button>
        </div>
      </div>
    );
  }
}

export default TournamentBracketContainer;
