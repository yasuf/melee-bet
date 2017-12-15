import React from 'react'
import * as FontAwesome from 'react-icons/lib/fa'

import './login.css'

import { signInWithFacebook } from 'utils/firebase/auth'

const LogIn = ({ openFacebookOAuth}) => { 
  return (
    <div>
      {
        //<a href="http://localhost:8080/auth/facebook">
      }
      <button className="fb-login" onClick={ signInWithFacebook }>
        <FontAwesome.FaFacebookSquare className="fb-logo" /> Log in with Facebook
      </button>
      {
        // </a>
      }
    </div>
  )
}

export default LogIn
