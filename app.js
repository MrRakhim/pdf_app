const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require('express-async-errors');
require('dotenv').config();

const Response = require('./src/utils/ApiResponse.js');
const { ValidationError, NotFoundError } = require('./src/utils/ErrorTypes');
const { apiDocOptions } = require('./src/config.js');

console.log('Start app.js');
console.log('Configure express');
const app = express();

const port = process.env.PORT || 5524;

app
    .set('port', port)
    .use(function (req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);

        if (req.headers) res.header('Access-Control-Allow-Headers', Object.keys(Object.assign({
            'content-type': 1
        }, req.headers)).join(','));
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        next();
    })
    .disable('x-powered-by')
    .use(
        cors({
            origin: true,
            credentials: true
        })
    )
    .set('trust proxy', true)
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(fileUpload({ defCharset: 'utf8', defParamCharset: 'utf8' }))
    .use(
        '/docs', 
        swaggerUi.serve, 
        swaggerUi.setup(
            swaggerJsdoc(apiDocOptions)
        )
    );

app
    .use(require('./src/routes'))
    .use(async (error, req, res, _next) => {
        let errCode = 500;
        if (error instanceof ValidationError) errCode = 400;
        else if (error instanceof NotFoundError) errCode = 404;
        
        return res.status(errCode).json(new Response().error(error));
    })
    .use((req, res, next) => res.status(404).json(new Response().error('Method not found')))
;

app.listen(port, () => {
    console.log(`Local App listening at http://${process.env.HOST || 'localhost'}:${port}`);
});
