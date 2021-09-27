const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/user');
const Address = require('../models/address');

const connection = new Sequelize(dbConfig);


Address.init(connection);
User.init(connection);
Address.associate(connection.models);
User.associate(connection.models);


(async () => {
  try {
    await connection.authenticate();

    console.log('Database connection has been established successfully.')
  } catch (err) {

    console.log(`Unable to connect to the database: ${err}`)
  }
})();

module.exports = { connection }