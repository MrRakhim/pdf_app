const knex = require('../../db');

module.exports.uploadDocument = async (email, title, filePath, originalFilename) => 
    knex('documents').insert({ email, fileName: title, originalFilename, filePath, filePreviewPath: 'poka net' }, '*');

module.exports.listDocuments = async () => knex('documents').select('*');

module.exports.getDocument = async (id) => knex('documents').select('*').where({ id }).first();

module.exports.deleteDocument = async (id) => knex('documents').del().where({ id });

module.exports.updateDocument = async (id, fileName) => knex('documents').update({ fileName }).where({ id });