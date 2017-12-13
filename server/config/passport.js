const passport = require('passport')

const FacebookStrategy = require('passport-facebook').Strategy

const User = require('../models/User')

const { transaction } = require('objection')

passport.serializeUser((user, done) => {
  console.log('serializing', user)
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.query().where({ id })
    .then(user => {
      done(null, user)
    })
})

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['name', 'email', 'link', 'locale', 'timezone', 'gender'],
    passReqToCallback: true 
  },
  (req, accessToken, refreshToken, profile, done) => {
    User
      .query()
      .where({ facebook: profile.id })
      .then(user => {
        if(user.length) {
          return done(null, user[0])
        } else {
          User.query().insert({ 
            name: profile.name.givenName,
            facebook: profile.id,
            email: profile.emails[0].value
          }).then(user => {
            return done(null, use)
          })
        }
      })
      .catch(error => {
        done(error)
      })
  }
))


//
