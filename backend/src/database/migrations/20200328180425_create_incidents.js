
exports.up = function (knex) {
  return knex.schema.createTable('incidents', function (table) {
    table.increments();

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('recipientId').notNullable();
    table.foreign('recipientId').references('id').inTable('users');

    table.string('voluntaryId').nullable();
    table.foreign('voluntaryId').references('id').inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('incidents');
};
