const { ValidationError, NotFoundError } = require('../../utils/ErrorTypes');
const { upload, download, deleteFile } = require('../../utils/file');
const { uploadDocument, getDocument, listDocuments, deleteDocument, updateDocument } = require('./repository');

const postDocumentService = async (email, title, file) => {
    if (!email) throw new ValidationError('"email" is required.');
    if (!title) throw new ValidationError('"title" is required.');

    if (!file) throw new ValidationError('"file" is required.');

    if (file.mimetype !== 'application/pdf') throw new ValidationError('"file" must be pdf');
    
    const uploaded = await upload(file);
    if (!uploaded) throw new Error('Something went wrong, during the file upload');

    return uploadDocument(email, title, uploaded, file.name);
};

const getDocumentService = async (id) => {
    id = parseInt(id);
    if (!id) throw new ValidationError('Specified "id" is invalid!');
    
    const document = await getDocument(id);
    if (!document) throw new NotFoundError('No document was found by specified id.');
    return document;
};

const getDocumentListService = async () => listDocuments();

const downloadDocumentService = async (id) => {
    id = parseInt(id);
    if (!id) throw new ValidationError('Specified "id" is invalid!');

    const document = await getDocumentService(id);
    if (!document) throw new NotFoundError('No document was found by specified id.');
    return download(document.filePath);
};

const deleteDocumentService = async (id) => {
    id = parseInt(id);
    if (!id) throw new ValidationError('Specified "id" is invalid!');
    
    const document = await getDocumentService(id);
    if (!document) throw new NotFoundError('No document was found by specified id.');

    await deleteFile(document.filePath);
    return deleteDocument(id);
};

const editDocumentService = async (id, title) => {
    id = parseInt(id);
    if (!id) throw new ValidationError('Specified "id" is invalid!');

    const document = await getDocumentService(id);
    if (!document) throw new NotFoundError('No document was found by specified id.');

    if (document.fileName === title) return;

    return updateDocument(id, title);
};

module.exports = {
    getDocumentService,
    downloadDocumentService,
    postDocumentService,
    getDocumentListService,
    deleteDocumentService,
    editDocumentService
};