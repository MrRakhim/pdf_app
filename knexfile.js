require('dotenv').config();

const connection = require('./src/config').DATABASE;

const config = {
    client: 'pg',
    connection,
    pool: {
        min: 0,
        max: 10,
    },
    migrations: {
        tableName: 'migrations',
    },
};
console.log({ connection });
module.exports = config;
