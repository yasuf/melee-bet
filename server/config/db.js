const objection = require('objection')
const Model = objection.Model
const Knex = require('knex')

const knex = Knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '123',
    database: 'downair'
  },
  pool: {
    min: 2,
    max: 10
  }
})

Model.knex(knex)

module.exports = knex
