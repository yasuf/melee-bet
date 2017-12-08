import React, { Component } from 'react'
import './default-button.css'

import classnames from 'classnames'

class DefaultButton extends Component {

  render() {
    const { content, href, children, onClick, disabled } = this.props
    return (
      <button className={ classnames('default', { disabled })} onClick={ disabled ? () => {} : onClick }>
        <a href={ href }>
        { children }
        </a>
      </button>
    )
  }
}

export default DefaultButton
