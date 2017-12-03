import React from 'react'

import './header.css'

const Header = ({ loggedIn, facebookLogout }) => {
  return (
    <div className="App-header">
      <h2 className="logo">downair.gg</h2>
      { loggedIn && 
        <a 
          className="nav-item logout" 
          onClick={ facebookLogout }
        >
            Log-out
        </a> 
      }
    </div>
  )
}

export default Header
