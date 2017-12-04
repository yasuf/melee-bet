import React, { Component } from 'react'
import { array } from 'prop-types'

import Round from './Round'
import classnames from 'classnames'

class RoundGenerator extends Component {

  static propTypes = {
    // structure: [{ playerTop: {tag: 'Mango', isWinner: true }, { playerBottom:"Armada" }]
    matches: array 
  }

  renderMatch = ({ playerTop, playerBottom }) => {
    debugger
    return [
      <li className="spacer">
        &nbsp;
      </li>,
      <li className={ classnames('game' ,'game-top', { winner: playerTop.isWinner }) }>
        { playerTop.tag }
      </li>,
      <li className="game game-spacer">
        &nbsp;
      </li>,
      <li className={ classnames('game' ,'game-bottom', { winner: playerBottom.isWinner }) }>
        { playerBottom.tag }
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
