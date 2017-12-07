import React from 'react'
import * as FontAwesome from 'react-icons/lib/fa'

import './login.css'

const LogIn = ({ openFacebookOAuth}) => { 
  return (
    <div>
      <button className="fb-login" onClick={ openFacebookOAuth }>
        <FontAwesome.FaFacebookSquare className="fb-logo" /> Log in with Facebook
      </button>
      
    </div>
  )
}

export default LogIn
