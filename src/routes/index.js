const { Router } = require('express');
const documents = require('./documents');

const globalRouter = Router({ mergeParams: true });

globalRouter.use('/documents', documents);

module.exports = globalRouter;