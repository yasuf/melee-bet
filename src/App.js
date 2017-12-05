import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import * as FontAwesome from 'react-icons/lib/fa'
import LogIn from './features/login/LogIn'
import Header from './features/common/Header'
import TicketList from './features/tickets/components/TicketList'
import DashboardContainer from './features/dashboard/container/DashboardContainer'
import Sidebar from './features/sidebar/components/Sidebar'

import Tournaments from './features/tournaments/container/Tournaments'
import Rankings from './features/rankings/container/Rankings'

import { BrowserRouter as Router,
          Route } from 'react-router-dom'

import { signOut, signInWithFacebook, checkFirebaseLogInStatus } from './utils/firebase'

const firebase = require('firebase')

const defaultState = {
  loggedIn: false,
  isSidebarOpen: false
}

class App extends Component {

  constructor() {
    super()
    this.state = defaultState
  }

  componentWillMount() {
    this.checkLogInStatus()
  }

  checkLogInStatus = () => {
    checkFirebaseLogInStatus((user) => {
      if (user) {
        this.setState({ loggedIn: true })
      }
    })
  }

  facebookLogout = () => {
    signOut()
      .then(() => {
        this.setState({ loggedIn: false })
      })
      .catch(() => {
        console.error('sign out error')
      })
  }

  openFacebookOAuth = (e) => {
    e.preventDefault()
    signInWithFacebook()
      .then((result) => {
        const token = result.credential.accessToken
        const user = result.user
        const email = user.email
      })
      .catch((error) => {
        const errorCode = error.code
      })
  }

  onSetSidebarOpen = (open) => {
    this.setState({ isSidebarOpen: open })
  }

  renderLoggedInRoutes = () => {
    return (
      <div>
        <Route path="/tournaments" component={ Tournaments } />
        <Route exact path="/tickets" component={ TicketList } />
        <Route path="/tickets/:id" component={ DashboardContainer } />
        <Route path="/rankings" component={ Rankings } />
      </div>
    )
  }

  render() {
    const { loggedIn } = this.state
    return (
      <div className="App">
        <Router>
          <div>
            <Header
              facebookLogout={ this.facebookLogout } 
              loggedIn={ this.state.loggedIn } 
            />
            <Sidebar 
              isSidebarOpen={ this.state.isSidebarOpen }
              loggedIn={ this.state.loggedIn }
            >
            { this.state.loggedIn && this.renderLoggedInRoutes() }
            { !this.state.loggedIn && 
              <LogIn openFacebookOAuth={ this.openFacebookOAuth } /> 
            }
            </Sidebar>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
