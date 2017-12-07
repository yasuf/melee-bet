import React, { Component } from 'react'
import ReactSidebar from 'react-sidebar'

import { Link } from 'react-router-dom'

import './sidebar.css'

class Sidebar extends Component {

  renderContent = () => {
    return (
      <ul className="sidebar-list">
        {/*
          <Link to="/tournaments">
          <li>
              Tournaments
          </li>
        </Link>*/}
        <Link to="/tickets">
          <li>
              Tickets
          </li>
        </Link>
        <Link to="/rankings">
          <li>
              Rankings
          </li>
        </Link>
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
