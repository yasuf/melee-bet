import React, { Component } from 'react'
import './default-button.css'

class DefaultButton extends Component {

  render() {
    const { content, href, children, onClick } = this.props
    return (
      <button className="default" onClick={ onClick }>
        <a href={ href }>
        { children }
        </a>
      </button>
    )
  }
}

export default DefaultButton
