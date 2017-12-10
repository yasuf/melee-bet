import React, { Component } from 'react'
import ReactSidebar from 'react-sidebar'

import { Link } from 'react-router-dom'
import { fetchAdmins } from 'utils/firebase/db'

import './sidebar.css'

import SidebarItem from 'features/common/components/SidebarItem'

class Sidebar extends Component {

  constructor() {
    super()
    this.state = {}
  }
  componentWillMount() {
    this.fetchAdmins()
  }

  fetchAdmins = () => {
    fetchAdmins().then((snap) => {
      const admins = snap.val()
      const { facebookUid } = this.props
      if(admins.indexOf(facebookUid) > -1) {
        this.setState({ isAdmin: true })
      }
    })
  }

  renderContent = () => {
    const { isAdmin } = this.state
    return (
      <ul className="sidebar-list">
        {/*
          <Link to="/tournaments">
          <li>
              Tournaments
          </li>
        </Link>*/}
        <Link to="/tickets">
          <SidebarItem>
            My Tickets
          </SidebarItem>
        </Link>
        { 
          isAdmin && 
          <Link to="/admin">
            <SidebarItem>
              Admin
            </SidebarItem>
          </Link>
        }
        { /*
        <Link to="/rankings">
          <li>
              Rankings
          </li>
        </Link>
        */
        }
      </ul>
    )
  }

  render() {
    const { isSidebarOpen, styles, loggedIn } = this.props
    const sidebarStyles = { root: { top: '60px' }, content: { backgroundColor: '#f7f7f7' } }
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
