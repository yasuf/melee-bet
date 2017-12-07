import React, { Component } from 'react'
import './sidebar-item.css'

class SidebarItem extends Component {

  render() {
    const { content, href, children, onClick } = this.props
    return (
      <button className="sidebar-item" onClick={ onClick }>
        <a href={ href }>
        { children }
        </a>
      </button>
    )
  }
}

export default SidebarItem
