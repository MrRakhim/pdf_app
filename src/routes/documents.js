const { Router } = require('express');
const { getDocumentsList, getSingleDocument } = require('../modules/document/action');

const router = Router({ mergeParams: true });

router.get('/list', getDocumentsList);

router.get('/:id', getSingleDocument);

module.exports = router;