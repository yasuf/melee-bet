import React from 'react'

const defaultState = {}

class MatchBracketPlayer extends React.Component {

  constructor() {
    super()
    this.state = defaultState
  }

  toggleCheckMark = () => {
    const { onClick, tag } = this.props
    onClick()
    if (tag) {
      this.setState({ renderCheckmark: !this.state.renderCheckmark })
    }
  }

  render() {
    const { className, onClick, tag, showCheckmark } = this.props
    return  (
      <li 
        className={ className }
        onClick={ this.toggleCheckMark }
      >
        { tag || '-' } { showCheckmark && <span>&#9989;</span> }
      </li>
    )
  }
}

export default MatchBracketPlayer
