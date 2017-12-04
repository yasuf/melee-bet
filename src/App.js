import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import * as FontAwesome from 'react-icons/lib/fa'
import LogIn from './features/login/LogIn'
import Header from './features/common/Header'
import DashboardContainer from './features/dashboard/container/DashboardContainer'

const firebase = require('firebase')

const defaultState = {
  loggedIn: false
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
    const user = firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ loggedIn: true })
      }
    })
  }

  facebookLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        console.log('sign out success')
        this.setState({ loggedIn: false })
      })
      .catch(() => {
        console.error('sign out error')
      })
  }

  openFacebookOAuth = (e) => {
    e.preventDefault()
    const provider = new firebase.auth.FacebookAuthProvider()    

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const token = result.credential.accessToken
        const user = result.user
        const email = user.email
      })
      .catch((error) => {
        debugger
        const errorCode = error.code
      })
  }

  render() {
    const { loggedIn } = this.state
    return (
      <div className="App">
        <Header 
          facebookLogout={ this.facebookLogout } 
          loggedIn={ this.state.loggedIn } 
        />
        <p className="App-intro">
          Welcome to downair.gg
        </p>
        { this.state.loggedIn && <DashboardContainer /> }
        { !this.state.loggedIn && <LogIn openFacebookOAuth={ this.openFacebookOAuth } /> }
      </div>
    );
  }
}

export default App;
