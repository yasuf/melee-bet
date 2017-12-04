import React, { Component } from 'react'
import ReactSidebar from 'react-sidebar'

import './sidebar.css'

class Sidebar extends Component {

  renderContent = () => {
    return (
      <ul className="sidebar-list">
        <li>
          <a href="#">Tournaments</a>
        </li>
        <li>
          <a href="#">My Tickets</a>
        </li>
        <li>
          <a href="#">Rankings</a>
        </li>
      </ul>
    )
  }

  render() {
    const { isSidebarOpen, styles, loggedIn } = this.props
    const sidebarStyles = { root: { top: '60px' } }
    return (
      <ReactSidebar 
        sidebar={ this.renderContent() }
        open={ isSidebarOpen }
        onSetOpen={ this.onSetSidebarOpen }
        docked={ loggedIn }
        styles={ sidebarStyles }
        sidebarClassName="sidebar"
      >
        { this.props.children }
      </ReactSidebar>
    )
  }
}

export default Sidebar
