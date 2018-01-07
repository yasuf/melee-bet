const express = require('express')
const dotenv = require('dotenv').config({ path: 'server/.env'})
const session = require('express-session')
const passport = require('passport')
const logger = require('morgan')

const homeController = require('./controllers/homeController')

const passportConfig = require('./config/passport')

const app = express()

require('./config/db')

app.use(logger('dev'))

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('build'))

// app.get('/', homeController.index)

app.post('/user/:id')

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }))
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(req.session.returnTo || '/')
  }
)
module.exports = app
