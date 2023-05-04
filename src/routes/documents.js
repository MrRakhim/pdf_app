const { Router } = require('express');
const { getDocumentsList, getSingleDocument, postDocument, downloadDocument, deleteSingleDocument } = require('../modules/document/action');

const router = Router({ mergeParams: true });

router.get('/list', getDocumentsList);

router.get('/:id', getSingleDocument);

router.post('/upload', postDocument);

router.get('/:id/download', downloadDocument);

router.delete('/:id', deleteSingleDocument);

module.exports = router;