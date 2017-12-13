
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments()
    table.string('name')
    table.string('facebook')
    table.string('tokens')
    table.string('email')
    table.timestamps()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('users')
};
