const router = require('express').Router()

const topEightService = require('../services/topEightService')

const TOURNAMENTS_BASE = '/tournament'

/**
 * Get top 8 information from smash.gg's API
 * @route /tournament
 * @queryparam {String} [tournament_slug] Tournament slug to retrieve, i.e. 'genesis-3'
 */
router.get('/tournament', (req, res, next) => {
  const { tournament_slug } = req.query
  topEightService.getTopEightData(tournament_slug)
    .then(topEightData => {
      res.json(topEightData)
    })
    .catch(error => {
      res.json(error)
    })
})


module.exports = router
