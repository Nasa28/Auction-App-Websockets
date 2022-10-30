const { Sequelize } = require('sequelize');
require('dotenv').config();
const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;
const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
