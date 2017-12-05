import React from 'react'
import PropTypes from 'prop-types'

const Match = ({ playerTop, playerBottom }) => {
  return (
    <div>
      <li className="spacer">
        &nbsp;
      </li>
      <li className="game game-top winner">
        { playerTop }
      </li>
      <li className="game game-spacer">
        &nbsp;
      </li>
      <li className="game game-bottom">
        { playerBottom }
      </li>
      <li className="spacer">
        &nbsp;
      </li>
    </div>
  )
}

export default Match
