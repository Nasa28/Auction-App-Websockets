const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const Product = sequelize.define(
  'product',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    count_down: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },

    last_bidder: {
      type: DataTypes.STRING,
      defaultValue: null,
    },

    current_price: {
      type: DataTypes.STRING,
    },

    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    won: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    expires_at: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = Product;
