/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const configJson = require('../config/config');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const config = configJson[env];

// console.log('this is the environment: ', env);

const db = {};

let sequelize;
if (config.environment === 'production') {
  sequelize = new Sequelize(
    process.env[config.use_env_variable], config,
  );
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres',
      dialectOption: {
        ssl: true,
        native: true,
      },
      logging: true,
    },
  );
} else {
  sequelize = new Sequelize(
    config.database, config.username, config.password, config,
  );
}

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0)
           && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    // eslint-disable-next-line global-require
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
