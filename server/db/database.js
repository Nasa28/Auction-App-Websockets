const { Sequelize } = require('sequelize');
require('dotenv').config();
const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, DB_HOST } = process.env;
const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
});

module.exports = sequelize;
