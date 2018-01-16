const redis = require('redis')
const client = redis.createClient()
const Queue = require('bull')

const updateSetsQueue = new Queue('update tournaments and sets')

updateSetsQueue.process((job, done) => {
  done()
})


/*
  
  {
    "tournament:genesis-3": {
      "set:1001": {
        startedAt: 19023910,
        completedAt: 2193490,
        winner:
      }
    }
  }
*/


/**
 * Every 30 seconds:
 * 1. Get top 8 results.
 * 2. Update our redis store.
 * 3. Find the sets that have finished and have not been marked as finished in our store.
 * 4. From the sets that were marked as done:
 *    a. Give Foresight cubes to the people that predicted correctly the 
 *    entrant that would win for a particular set
 * 5. Mark tournaments that are done with a status of finished
 */
function startUpdateSetsJob() {
  updateSetsQueue.add({}, { repeat: { cron: '0,15,30,45 * * * *' } })
}

function updateTournaments() {
  
}


/**
 * Updates sets information
 * @param {string} tournamentSlug Slug of the tournament to update the data
 * @returns {Array<Sets>} Array containing the sets that were updated
 */
function updateSets(tournamentSlug, data) {
}


/**
 * Updates started sets in redis
 */
function updateStartedSets(sets) {
  sets.forEach(set => {
    if (set.startedAt) {
    }
  })
}

function updateFinishedSets(sets) {

}

module.exports = {}
