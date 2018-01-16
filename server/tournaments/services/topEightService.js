const request = require('request-promise-native');
const smashGGBase = 'https://api.smash.gg';
const qs = require('qs');
const encodingOptions = { encode: false, arrayFormat: 'brackets' };
const { Tournament, STATUS } = require('../models/Tournament')

const SMASH_GG_MELEE_GAME_ID = 1;
const SMASH_GG_MELEE_SINGLES_TITLE = 'melee singles'
const SMASH_GG_TOP_EIGHT_PHASE_NAME = 'top 8';
const SMASH_GG_ERROR = 'Error fetching data from smash.gg';

/**
 * Start tracking a tournament results to update users scores
 * @param {string} tournamentSlug slug of the tournament to start tracking
 */
function trackTournament(tournamentSlug) {
  getTournamentData(tournamentSlug, []).then(data => {
    const { id, name } = data.entities.tournament
    Tournament.insert({ name, tournament_id: id, status: STATUS.active })
  })
}

/**
 * Fetch information about a tournament from smash.gg
 * @param {string} tournamentSlug slug to get information about
 * @param {Array} expands Expands to get extra information about the tournament from smash.gg
 * @return {Promise} Promise resolving with the information about the tournament
 */
function getTournamentData(tournamentSlug, expands) {
  const expandsString = qs.stringify(
    { expand: expands },
    encodingOptions
  );
  return request.get({
    url: `${smashGGBase}/tournament/${tournamentSlug}?${expandsString}`,
    json: true,
  })
}

/**
 * Gets top eight data from smash.gg for a tournament
 * @async
 * @param {string} tournamentSlug slug of the tournament to retrieve information about
 * @returns {Promise<Array>} Returns a Promise that resolves with an array with the top 8 information
 */
function getTopEightData(tournamentSlug, tournamentExpands) {
  const phaseGroupExpands = qs.stringify(
    { expand: ['sets', 'entrants', 'standings'] },
    encodingOptions
  );
  return getTournamentData(tournamentSlug, tournamentExpands).then(tournamentResponse => {
    const events = tournamentResponse.entities.event
    const phases = tournamentResponse.entities.phase
    const groups = tournamentResponse.entities.groups
    const meleeEvent = getMeleeSinglesEvent(events)
    const topEightPhase = getTopEightPhase(phases, meleeEvent)
    const topEightGroup = getPhaseGroups(groups, topEightPhase)[0]
    return request.get({
      url: `${smashGGBase}/phase_group/${topEightGroup.id}?${phaseGroupExpands}`,
      json: true
    })
  })
  .then(phaseResponse => {
    return new Promise((resolve, reject) => {
      const { player: players, sets, entrants } = phaseResponse.entities
      if(!players || !sets || !entrants) reject(SMASH_GG_ERROR)
      resolve(formatResults(players, sets, entrants))
    })
  })
  .catch(error => {
    throw new Error(`${SMASH_GG_ERROR}: ${error}`)
  });
}

/**
 * Gets the ID of the Smash Bros Melee event from a collection of smash.gg events
 * @param {Object[]} events - Array of events from Smash.gg's API
 * @return {Object} returns the Smash Bros Melee game event
 */
function getMeleeSinglesEvent(events) {
  return events.find(currentEvent => {
    return currentEvent.videogameId === SMASH_GG_MELEE_GAME_ID &&
      currentEvent.name.toLowerCase() === SMASH_GG_MELEE_SINGLES_TITLE
  })
}

/**
 * Gets the ID of the top 8 phase in a collection of smash.gg's phases for a specific event
 * @param {Object[]} phases - Array of phases for a tournament from Smash.gg's API
 * @param {Object} event - Event for which we want to find the top 8 phase for
 * @returns {Object} Top eight phase object for the given event
 */
function getTopEightPhase(phases, event) {
  return phases.find(phase => {
    return phase.eventId === event.id && phase.name.toLowerCase() === SMASH_GG_TOP_EIGHT_PHASE_NAME
  })
}

/**
 * Gets all the groups related to a given phase
 * @param {Object[]} groups - Array of tournament group objects for all phases
 * @param {Object} phase - Phase to get groups for
 * @returns {Object[]} Groups related to phase param
 */
function getPhaseGroups(groups, phase) {
  return groups.filter(group => {
    return group.phaseId === phase.id
  })
}


/**
 * Formats a collection of sets, players and entrants into a more manageable structure
 * @param {Object[]} players - Collection of players
 * @param {Object[]} sets - Collection of set results
 * @param {Object[]} entrants - Collection of entrants' data
 * @returns {Array} Formatted results of smash.gg's data
 */
function formatResults(players, sets, entrants) {
  const formattedData = []
  const playersHash = {}
  const entrantsHash = {}
  players.forEach(player => {
    playersHash[player.entrantId] = player
  })
  entrants.forEach(entrant => {
    entrantsHash[entrant.id] = entrant
  })
  sets.forEach(set => {
    const { entrant1Id, entrant2Id } = set
    formattedData.push({
      set,
      player1: playersHash[entrant1Id],
      player2: playersHash[entrant2Id],
      entrant1: entrantsHash[entrant1Id],
      entrant2: entrantsHash[entrant2Id]
    })
  })
  return formattedData
}

module.exports = {
  trackTournament,
  getTournamentData,
  getTopEightData,
  getMeleeSinglesEvent,
  getTopEightPhase,
  getPhaseGroups,
  formatResults
};

