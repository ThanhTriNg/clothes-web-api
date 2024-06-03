const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DBNAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: '3306',
});

const test = async () => {
    try {
        await sequelize.authenticate();
        // console.log(error);('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
test();
