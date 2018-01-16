const router = require('express').Router()

const topEightService = require('../services/topEightService')

const TOURNAMENTS_BASE = '/tournament'

/**
 * Get top 8 information from smash.gg's API
 * @route {GET} /tournament
 * @queryparam {String} [tournament_slug] Tournament slug to retrieve, i.e. 'genesis-3'
 */
router.get('/tournament', (req, res, next) => {
  const { tournament_slug } = req.query
  const tournamentExpands = ['event', 'phase', 'groups']
  topEightService.getTopEightData(tournament_slug, tournamentExpands)
    .then(topEightData => {
      res.json(topEightData)
    })
    .catch(error => {
      res.json(error)
    })
})

/**
 * Start tracking a tournament in our servers
 * @route {POST} /tournaments/tracking
 * @bodyparam {String} tournament_slug Slug of the tournament to start tracking
 */
router.post('/tracking', (req, res, next) => {
  const { tournament_slug } = req.body
  topEightService.trackTournament(tournament_slug)
    .then(() => {
      res.json({ message: 'Success' })
    })
    .catch(error => {
      res.json(error)
    })
})

module.exports = router
