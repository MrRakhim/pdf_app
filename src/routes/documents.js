const { Router } = require('express');
const { getDocumentsList, getSingleDocument, postDocument } = require('../modules/document/action');

const router = Router({ mergeParams: true });

router.get('/list', getDocumentsList);

router.get('/:id', getSingleDocument);

router.post('/upload', postDocument);

module.exports = router;