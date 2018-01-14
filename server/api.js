const router = require('express').Router();

const tournamentsApi = require('./tournaments/api');

router.use('/tournaments', require('./tournaments/api'));

module.exports = router;
