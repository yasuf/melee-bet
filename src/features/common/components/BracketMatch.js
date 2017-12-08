import React from 'react'
import MatchBracketPlayer from './MatchBracketPlayer'

const defaultState = {
  selectedPlayer: '',
}

class BracketMatch extends React.Component {

  constructor() {
    super()
    this.state = defaultState
  }

  onMatchBracketPlayerClicked = (selectedPlayer) => {
    const { onPlayerClick, playerTop, playerBottom } = this.props
    if(playerTop.tag && playerBottom.tag) { 
      if(selectedPlayer === 'top') {
        onPlayerClick(playerTop, playerBottom)
      }
      if(selectedPlayer === 'bottom') {
        onPlayerClick(playerBottom, playerTop)
      }
      this.setState({ selectedPlayer })
    }
  }

  toggleCheckMark = () => {
    const { onClick, tag } = this.props
    onClick()
    if (tag) {
      this.setState({ renderCheckmark: !this.state.renderCheckmark })
    }
  }

  render() {
    const { playerTop, playerBottom, onPlayerClick } = this.props
    const { renderCheckmark, selectedPlayer } = this.state
    return [
      <MatchBracketPlayer 
        className="game game-top"
        onClick={ () => this.onMatchBracketPlayerClicked('top') }
        tag={ playerTop.tag }
        showCheckmark={ selectedPlayer === 'top' }
      />,
      <MatchBracketPlayer 
        className="game game-bottom"
        onClick={ () => this.onMatchBracketPlayerClicked('bottom') }
        tag={ playerBottom.tag }
        showCheckmark={ selectedPlayer === 'bottom' }
      />
    ]
  }
}

export default BracketMatch
