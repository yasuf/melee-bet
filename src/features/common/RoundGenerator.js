import React, { Component } from 'react'
import { array, func } from 'prop-types'

import Round from './Round'
import classnames from 'classnames'

import './round-generator.css'

class RoundGenerator extends Component {

  static propTypes = {
    // structure: [{ playerTop: {tag: 'Mango', isWinner: true }, { playerBottom:"Armada" }]
    matches: array,
    onPlayerClick: func
  }

  renderMatch = ({ playerTop, playerBottom }) => {
    const { onPlayerClick } = this.props
    if (!playerTop || !playerBottom) {
      const player = playerTop || playerBottom
      return (
        <li 
          className={ classnames('game' ,'game-top', { winner: player.isWinner }) }
        >
        { player.tag }
      </li>)
    }
    return [
      <li className="spacer">
        &nbsp;
      </li>,
      <li 
        className={ classnames('game' ,'game-top', { winner: playerTop.isWinner }) }
        onClick={ () => this.props.onPlayerClick(playerTop) }
      >
        { playerTop.tag || '-' }
      </li>,
      <li className="game game-spacer">
        &nbsp;
      </li>,
      <li 
        className={ classnames('game' ,'game-bottom', { winner: playerBottom.isWinner }) }
        onClick={ () => { this.props.onPlayerClick(playerBottom) }  }
      >
        { playerBottom.tag || '-' }
      </li>,
      <li className="spacer">
        &nbsp;
      </li>
    ]
  }

  render() {
    const { matches } = this.props
    return (
      <ul className="round round-1">
        { 
          matches.map((match) => {
            return this.renderMatch(match)
          })
        }
      </ul>
    )
  }
}

export default RoundGenerator
