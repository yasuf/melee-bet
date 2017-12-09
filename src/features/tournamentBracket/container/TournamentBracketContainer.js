import React, { Component } from 'react';
import classnames from 'classnames'
import './tournament-bracket-container.css';
import '../components/bracket.css'
import * as FontAwesome from 'react-icons/lib/fa'

import BracketComponent from '../components/BracketComponent'
import Match from '../components/Match'
import RoundGenerator from '../../common/RoundGenerator'

import { retrieveTournamentData,
  sendPrediction,
  retrieveUserPrediction,
  retrieveTournamentResults
} from '../../../utils/firebase/db'

import DefaultButton from 'features/common/components/DefaultButton'

const secondRoundData = [
  { playerTop: { tag: '-', isWinner: true }, playerBottom: { tag: "-", isWinner: false } },
]

const WinnerData = [
  { playerTop: { tag: '-', isWinner: true } }
]

const EXCLUDED_FROM_SCORE = [
  'losersQuartersTopOpponent', 
  'losersQuartersBottomOpponent',
  'losersFinalsOpponent'
]

const defaultState = {
  predictions: {
    winnersFinals: {},
    losersFinals: {},
    winnersSemisTop: {},
    winnersSemisBottom: {},
    prelosersQuartersTop: {},
    prelosersQuartersBottom: {},
    key: 1
  }
}

class TournamentBracketContainer extends Component {

  constructor() {
    super()
    this.state = defaultState
  }

  componentWillMount() {
    this.fetchTournamentData()
  }

  fetchTournamentData = () => {
    const { id } = this.props.match.params
    retrieveTournamentData(id)
      .then(snap => {
        let tournament = snap.val()
        tournament = { 
          ...this.populateMatchData(tournament),
          tournamentStarted: tournament.tournamentStarted
        }
        this.setState({ tournamentData: tournament })
        this.fetchPrediction()
        this.fetchTournamentResults()
      }) 
  }

  fetchPrediction = () => {
    const { id } = this.props.match.params
    retrieveUserPrediction(id)
      .then(snap => {
        const predictions = snap.val()
        if(!predictions) return
        this.setState({ 
          predictions,
          predictionSubmitted: true
        })
      })
  }

  fetchTournamentResults = () => {
    const { id } = this.props.match.params
    retrieveTournamentResults(id).then((snap) => {
      const results = snap.val()
      this.setState({ results: results}, this.calculateScore)
    })
  }

  calculateScore = () => {
    const { predictions, results } = this.state
    let score = 0
    if(!results) return
    const resultsObj = Object.values(results)[0]
    for(let key in resultsObj) {
      if(resultsObj[key].id === predictions[key].id && EXCLUDED_FROM_SCORE.indexOf(key) === -1) {
        score++
      }
    }
    this.setState({ score })
  }

  resetAllPredictions = () => {
    this.setState({
      predictions: {},
      // we need to this so that React resets the state of inner 
      // components back to their initial state
      key: this.state.key++ 
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
      prelosersQuartersBottomB
    }
  }

  onSendPrediction = () => {
    const tournamentId = this.props.match.params.id
    const { tournamentData, predictions } = this.state
    const {
      losersQuartersTopA,
      losersQuartersBottomA,
      losersFinalsBottom
    } = predictions
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
      losersFinals,
      losersQuartersTopOpponent: losersQuartersTopA,
      losersQuartersBottomOpponent: losersQuartersBottomA,
      losersFinalsOpponent: losersFinalsBottom
    }
    sendPrediction(prediction, tournamentId)
  }

  onPlayerClick = (player, opponent) => {
    const { tag } = player
    const { predictions, predictionSubmitted } = this.state
    if(predictionSubmitted) return
    if(!player.tag || !opponent.tag) return
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
    let prelosersQuartersTop, prelosersQuartersBottom
    if (predictions.losersQuartersTopOpponent) {
      prelosersQuartersTop = predictions.losersQuartersTopOpponent
    } else {
      prelosersQuartersTop = { ...predictions.losersQuartersTopA, match: 'losersQuartersTop' }
    }
    if (predictions.losersQuartersBottomOpponent) {
      prelosersQuartersBottom = predictions.losersQuartersBottomOpponent
    } else {
      prelosersQuartersBottom = { ...predictions.losersQuartersBottomA, match: 'losersQuartersBottom' }
    }
    return [
      {
        playerTop: prelosersQuartersTop,
        playerBottom: { ...predictions.prelosersQuartersTop, match: 'losersQuartersTop' }
      },
      {
        playerTop: prelosersQuartersBottom,
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
    let playerBottom
    if(predictions.losersFinalsOpponent) {
      playerBottom = predictions.losersFinalsOpponent
    } else {
      playerBottom = { ...predictions.losersFinalsBottom, match: 'losersFinals' }
    }
    return [{
      playerTop: { ...predictions.losersSemis, match: 'losersFinals' },
      playerBottom
    }]
  }

  mapFirstPlace = () => {
    const { predictions } = this.state
    return [{
      playerTop: { ...predictions.grandFinals, match: 'grandFinals' },
    }]
  }

  render() {
    const { predictionSubmitted, score } = this.state
    const { tournamentData } = this.state
    if(!tournamentData) return null
    const { tournamentStarted } = tournamentData
    debugger
    const iconStyles = {
      verticalAlign: 'top'
    }
    return (
      <div className="dashboard-container" key={ this.state.key }>
        <h2 onClick={ this.updateKey }>Create a fantasy bracket</h2>
        <p><b>Instructions:</b> Pick a winner for each match and submit once you fill the bracket completely.</p>
        { tournamentStarted && <div className="notification">
            <FontAwesome.FaInfoCircle style={ iconStyles } /> Tournament has started!
          </div> 
        }
        { predictionSubmitted && <div className="notification">
            <FontAwesome.FaInfoCircle style={ iconStyles } /> You already submitted your ticket
          </div> 
        }
        { tournamentStarted && <div className="points">My Score: { `${score}/10` }</div> }
        <div className={ classnames("winners-bracket", 'bracket', { disabled: tournamentStarted || predictionSubmitted }) }>
          <main id="tournament">
            <RoundGenerator 
              matches={ this.mapWinnersFirstRoundData() }
              onPlayerClick={ this.onPlayerClick }
              roundName="Winners Semis"
            />
            <RoundGenerator 
              matches={ this.mapWinnersFinalsData() }
              onPlayerClick={ this.onPlayerClick }
              roundName="Winners Finals"
            />
            <RoundGenerator
              matches={ this.mapGrandfinalsData() }
              onPlayerClick={ this.onPlayerClick }
              roundName="Grand Finals"
            />
            <RoundGenerator
              matches={ this.mapFirstPlace() }
              roundName="Champion"
            />
          </main>
        </div>
        <div className={ classnames("losers-bracket", 'bracket', { disabled: tournamentStarted || predictionSubmitted }) }>
          <main id="tournament">
            <RoundGenerator 
              matches={ this.mapLosersFirstRoundData() }
              onPlayerClick={ this.onPlayerClick }
              roundName="Losers Eights"
            />
            <RoundGenerator 
              matches={ this.mapLosersQuartersData() }
              onPlayerClick={ this.onPlayerClick }
              roundName="Losers Quarters"
            />
            <RoundGenerator
              matches={ this.mapLosersSemisData() }
              onPlayerClick={ this.onPlayerClick }
              roundName="Losers Semis"
            />
            <RoundGenerator
              matches={ this.mapLosersFinalsData() }
              onPlayerClick={ this.onPlayerClick }
              roundName="Losers Finals"
            />
          </main>
        </div>
        <div className="controls">
          <DefaultButton
            onClick={ this.resetAllPredictions }
            disabled={ tournamentStarted || predictionSubmitted }
          >
            Reset All
          </DefaultButton>
          <DefaultButton
            onClick={ this.onSendPrediction }
            disabled={ tournamentStarted || predictionSubmitted }
          >
            Submit Ticket
          </DefaultButton>
        </div>
      </div>
    );
  }
}

export default TournamentBracketContainer;
