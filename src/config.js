module.exports = {
    DATABASE: {
        host: process.env.DB_HOST,
        port: +(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PSWD,
        database: process.env.DB_NAME
    },
};