import React, { Component } from 'react'
import './PlayerCreator.css'

import { createPlayer } from 'utils/firebase/db'

class PlayerCreator extends Component {

  onTagChanged = (e) => {
    const tag = e.target.value
    this.setState({ tag })
  }

  createPlayer = () => {
    const { tag } = this.state
    createPlayer({ tag })
  }

  render() {
    const { alert, tournament } = this.props 
    return (
      <div>
        <h3>Create Player</h3>
        <label>Tag:</label><input onChange={ this.onTagChanged } type="text" />
        <button onClick={ this.createPlayer }>Create player</button>
      </div>
    )
  }
}

export default PlayerCreator

