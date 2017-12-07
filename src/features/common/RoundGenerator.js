import React, { Component } from 'react'
import { array, func } from 'prop-types'

import Round from './Round'
import classnames from 'classnames'

import './round-generator.css'

import BracketMatch from 'features/common/components/BracketMatch'

class RoundGenerator extends Component {

  static propTypes = {
    matches: array,
    onPlayerClick: func,
    onRemovePrediction: func
  }

  renderMatch = ({ playerTop, playerBottom }) => {
    const { onPlayerClick, onRemovePrediction } = this.props
    if (!playerTop || !playerBottom) {
      const player = playerTop || playerBottom
      return [
        <li className="spacer">
          &nbsp;
        </li>,
        <li 
          className={ classnames('game' ,'game-top', { winner: player.isWinner }) }
        >
          { player.tag || '-' }
        </li>,
        <li className="spacer">
          &nbsp;
        </li>
      ]
    }
    debugger
    return [
      <li className="spacer">
        &nbsp;
      </li>,
      <BracketMatch 
        onPlayerClick={ onPlayerClick }
        playerTop={ playerTop }
        playerBottom={ playerBottom }
      />,
      <li className="spacer">
        &nbsp;
      </li>
    ]
  }

  render() {
    const { matches, roundName } = this.props
    return (
      <ul className="round round-1">
        <li className="round">
          { roundName }
        </li>
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
