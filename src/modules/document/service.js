const { upload, download } = require('../../utils/file');
const { uploadDocument } = require('./repository');

module.exports.postDocumentService = async (email, title, file) => {
    if (!email) throw '"email" is required.';
    if (!title) throw '"title" is required.';

    const uploaded = await upload(file);
    if (!uploaded) throw 'Something went wrong, during the file upload';

    return uploadDocument(email, title, uploaded, file.name);
};

module.exports.getDocumentService = async (id) => {
    const name = '/documents/ТЕСТОВОЕ ЗАДАНИЕ NODE.JS.pdf';
    return download(name);
};