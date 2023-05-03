/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('documents', table => {
        table.increments('id', { primaryKey: true });
        table.string('email').notNullable();
        table.string('fileName').notNullable();
        table.string('filePath').notNullable();
        table.string('filePreviewPath').notNullable();
        table.string('originalFilename').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('documents');
};
