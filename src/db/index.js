const knex = require('knex');
const pg = require('pg');

const connection = require('../config').DATABASE;

pg.types.setTypeParser(pg.types.builtins.INT8, (value) => {
    return parseInt(value);
});
  
pg.types.setTypeParser(pg.types.builtins.FLOAT8, (value) => {
    return parseFloat(value);
});
  
pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value) => {
    return parseFloat(value);
});

const clientInstance = knex({
    client: 'pg',
    connection,
    acquireConnectionTimeout: 2000000,
    migrations: {
        tableName: 'migrations',
    },
});

module.exports = clientInstance;