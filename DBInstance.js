const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const database = process.env.DATABASE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(database, username, password, {
  dialect: 'postgres',
});

module.exports = sequelize;
