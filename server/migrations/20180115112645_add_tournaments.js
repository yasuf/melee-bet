
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tournaments', function(table) {
    table.increments('id').primary();
    table.integer('tournament_id').notNull();
    table.string('name').notNull();
    table.integer('status').defaultTo(1);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tournaments')
};
