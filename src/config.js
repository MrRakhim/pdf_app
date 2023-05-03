module.exports = {
    DATABASE: {
        host: process.env.DB_HOST,
        port: +(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PSWD,
        database: process.env.DB_NAME
    },
    apiDocOptions: {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: 'API documentation of PDF App',
                version: '0.0.1',
                license: {
                    name: 'License: ISC',
                    url: 'https://t.me/mraimaganbetov',
                },
                contact: {
                    name: 'API Support',
                    url: 'https://t.me/mraimaganbetov',
                    email: 'rz.aimaganbetov@gmail.com'
                }
            }
        },
        apis: ['./src/modules/**/*.js']
    }
};