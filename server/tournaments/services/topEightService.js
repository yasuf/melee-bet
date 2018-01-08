const request = require('request-promise-native');
const smashGGBase = 'https://api.smash.gg';
const qs = require('qs');
const encodingOptions = { encode: false, arrayFormat: 'brackets' };

const SMASH_GG_MELEE_GAME_ID = 1;
const SMASH_GG_TOP_EIGHT_PHASE_NAME = 'Top 8';

/* Public methods */
function getCurrentTournaments () {
  
}

/**
 * Gets top eight data from smash.gg for a tournament
 * @param {string} tournamentSlug slug of the tournament to retrieve information about
 */
function getTopEightData(tournamentSlug) {
  const tournamentExpands = qs.stringify(
    { expand: ['event', 'phase', 'groups'] }, 
    encodingOptions
  );
  const phaseGroupExpands = qs.stringify(
    { expand: ['sets', 'entrants', 'standings'] },
    encodingOptions
  );
  request({ 
    url: `${smashGGBase}/tournament/${tournamentSlug}?${tournamentExpands}`,
    json: true
  })
  .then(tournamentResponse => {
    const events = tournamentResponse.entities.event
    const phases = tournamentResponse.entities.phase
    const groups = tournamentResponse.entities.groups
    const meleeEvent = getMeleeEvent(events)
    const topEightPhase = getTopEightPhase(phases, meleeEvent)
    const topEightGroup = getPhaseGroups(groups, topEightPhase)[0]
    return request({
      url: `${smashGGBase}/phase_group/${topEightGroup.id}?${phaseGroupExpands}`,
      json: true
    })
  })
  .then(phaseResponse => {
    const players = phaseResponse.entities.player
    const sets = phaseResponse.entities.sets
    console.log(players)
    console.log(sets)
  })
  .catch(error => {
    console.log(error)
  });
}


getTopEightData('genesis-4');

/* Private methods */

/**
 * Gets the ID of the Smash Bros Melee event from a collection of smash.gg events
 * @param {Object[]} events - Array of events from Smash.gg's API
 * @return {Object} returns the Smash Bros Melee game event
 */
function getMeleeEvent(events) {
  return events.find(currentEvent => {
    return currentEvent.videogameId === SMASH_GG_MELEE_GAME_ID
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
    return phase.eventId === event.id && phase.name === SMASH_GG_TOP_EIGHT_PHASE_NAME
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

function getPhasePlayers(phase) {
}

module.exports = {
  getTopEightData
};

