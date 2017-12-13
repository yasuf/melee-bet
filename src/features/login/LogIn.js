import React from 'react'
import * as FontAwesome from 'react-icons/lib/fa'

import './login.css'

const LogIn = ({ openFacebookOAuth}) => { 
  return (
    <div>
      <a href="http://localhost:8080/auth/facebook">
      <button className="fb-login">
        <FontAwesome.FaFacebookSquare className="fb-logo" /> Log in with Facebook
      </button>
      </a>
    </div>
  )
}

export default LogIn
