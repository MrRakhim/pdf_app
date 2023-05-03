const express = require('express');
const cors = require('cors');
require('express-async-errors');
require('dotenv').config();

const Response = require('./src/utils/ApiResponse.js');

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
    .use(cors({
        origin: true,
        credentials: true
    }))
    .set('trust proxy', true)
    .use(express.json())
    .use(express.urlencoded({
        extended: true
    }))
    .use((err, req, res, next) => {
        if (!err) {
            return next();
        }
        console.error(err);
        res.status(500);
        res.send('Internal server error');
    })
	
    .use((req, res, next) => {
        try {
            next();
        } catch (error) {
            return res.status(500).json(new Response().error(error.message)); 
        }
    })
    .use(require('./src/routes'))
    .use((req, res, next) => {
        return res.status(404).json(new Response().error('Method not found'));
    })
;

app.listen(port, () => {
    console.log(`Local App listening at http://${process.env.HOST || 'localhost'}:${port}`);
});
