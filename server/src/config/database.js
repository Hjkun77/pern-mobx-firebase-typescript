/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-template */

/**
 * This file initialize configuraiton for sequelize migrations and seeders
 */

const dotenv = require('dotenv');

const env = process.env.NODE_ENV;
const validEnvs = ['development', 'staging', 'testing', 'production'];

if (!validEnvs.some(validEnv => validEnv === env)) {
  // eslint-disable-next-line no-console
  console.error(`Invalid environment "${env}" ('development|staging|testing|production')`);

  process.exit(1);
}

const configPaths = {
    development: '.env',
    testing: '.env.test',
    staging: '.env.staging',
    production: '.env.development'
};

const configPath = configPaths[env] || '.env';
dotenv.config({ path: configPath });

const {
  PG_PLATFORM_USER_NAME,
  PG_PLATFORM_DATABASE,
  PG_PLATFORM_PASSWORD,
  PG_PLATFORM_HOST,
  PG_PLATFORM_PORT
} = process.env;

const config = {
  [env]: {
    username: PG_PLATFORM_USER_NAME,
    host: PG_PLATFORM_HOST,
    password: PG_PLATFORM_PASSWORD,
    database: PG_PLATFORM_DATABASE,
    port: parseInt(PG_PLATFORM_PORT, 10),
    dialect: 'postgres'
  }
};

module.exports = config;
