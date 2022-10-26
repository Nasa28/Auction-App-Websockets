const { Sequelize } = require('sequelize');
require('dotenv').config();
const { DEV_DATABASE_URL } = process.env;
const sequelize = new Sequelize(DEV_DATABASE_URL);

module.exports = sequelize;
