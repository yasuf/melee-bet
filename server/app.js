const express = require('express')
const dotenv = require('dotenv')
const session = require('express-session')
const passport = require('passport')
const logger = require('morgan')
const chalk = require('chalk')

dotenv.load({ path: '.env.example' })

const app = express()

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}))

app.set('port', 8080)

app.use(logger('dev'))
app.use(passport.initialize())
app.use(passport.session())

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }))
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', 
  { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(req.session.returnTo || '/')
  }
)

app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'))
})
