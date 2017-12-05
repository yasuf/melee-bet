import React from 'react'

import { Bracket, BracketGame } from 'react-tournament-bracket'

class BracketComponent extends React.Component {

  render() {
    return (
      <div>
        <h1>Bracket</h1>
        <BracketGame 
          topText="Mang0"
          bottomText="Armada"
        />
      </div>
    )
  }
}

export default BracketComponent
