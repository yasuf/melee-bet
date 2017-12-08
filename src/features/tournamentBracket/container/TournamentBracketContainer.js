import React, { Component } from 'react';
import classnames from 'classnames'
import './tournament-bracket-container.css';
import '../components/bracket.css'
import * as FontAwesome from 'react-icons/lib/fa'

import BracketComponent from '../components/BracketComponent'
import Match from '../components/Match'
import RoundGenerator from '../../common/RoundGenerator'

import { retrieveTournamentData, sendPrediction } from '../../../utils/firebase/db'

import DefaultButton from 'features/common/components/DefaultButton'

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

  resetAllPredictions = () => {
    this.setState({
      predictions: {}
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
    const tournamentStarted = true
    const iconStyles = {
      verticalAlign: 'top'
    }
    return (
      <div className="dashboard-container">
        <h2>Create a fantasy bracket</h2>
        <p><b>Instructions:</b> Pick a winner for each match and submit once you fill the bracket completely.</p>
        { <div className="notification">
            <FontAwesome.FaInfoCircle style={ iconStyles } /> Tournament has started!
          </div> 
        }
        { tournamentStarted && <div className="points">My Score: { `7/11` }</div> }
        <div className={ classnames("winners-bracket", 'bracket', { disabled: true }) }>
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
        <div className={ classnames("losers-bracket", 'bracket', { disabled: true }) }>
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
            disabled={ tournamentStarted }
          >
            Reset All
          </DefaultButton>
          <DefaultButton
            onClick={ this.onSendPrediction }
            disabled={ tournamentStarted }
          >
            Submit Ticket
          </DefaultButton>
        </div>
      </div>
    );
  }
}

export default TournamentBracketContainer;
