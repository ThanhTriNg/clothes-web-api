// {
//     "development": {
//         "username": { "ENV": "DB_USERNAME" },
//         "password": { "ENV": "DB_PASSWORD" },
//         "database": { "ENV": "DB_DBNAME" },
//         "host": { "ENV": "DB_HOST" },
//         "dialect": "mysql",
//         "dialectOptions": {
//             "useUTC": false
//         },
//         "timezone": "+07:00"
//     },
//     "test": {
//         "username": "root",
//         "password": "12345678",
//         "database": "database_test",
//         "host": "127.0.0.1",
//         "dialect": "mysql"
//     },
//     "production": {
//         "username": "root",
//         "password": "12345678",
//         "database": "database_production",
//         "host": "127.0.0.1",
//         "dialect": "mysql"
//     }
// }
require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DBNAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        dialectOptions: {
            useUTC: false,
        },
        timezone: '+07:00',
    },
    test: {
        username: 'root',
        password: '12345678',
        database: 'database_test',
         host: process.env.DB_HOST,
        dialect: 'mysql',
    },
    production: {
        username: 'root',
        password: '12345678',
        database: 'database_production',
         host: process.env.DB_HOST,
        dialect: 'mysql',
    },
};
