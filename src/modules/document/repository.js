const knex = require('../../db');

module.exports.uploadDocument = async (email, title, filePath, originalFilename) => 
    knex('documents').insert({ email, fileName: title, originalFilename, filePath, filePreviewPath: 'poka net' }, '*');
