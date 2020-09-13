const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('users', 'postgres', 'kylerkeenan', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
