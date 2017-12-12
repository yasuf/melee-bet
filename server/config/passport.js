const passport = require('passport')

const FacebookStrategy = require('passport-facebook').Strategy

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  console.log(`deserializing user: ${id}`)
  done(null, { id: 10, name: 'Yasu' })
})

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['name', 'email', 'link', 'locale', 'timezone', 'gender'],
  passReqToCallback: true },
  (req, accessToken, refreshToken, profile, done) => {
    if(req.user) {

    } else {

    }
  }
}))
