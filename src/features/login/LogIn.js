import React from 'react'
import * as FontAwesome from 'react-icons/lib/fa'

const LogIn = ({ openFacebookOAuth}) => { 
  return (
    <button className="fb-login" onClick={ openFacebookOAuth }>
      <FontAwesome.FaFacebookSquare className="fb-logo" /> Log in with Facebook
    </button>
  )
}

export default LogIn
