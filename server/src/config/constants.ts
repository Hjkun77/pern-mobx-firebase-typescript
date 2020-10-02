const dotenv = require('dotenv')
export type ENV = 'development'|'testing'|'staging'|'production';

const configPaths = {
    development: '.env.development',
    testing: '.env.test',
    staging: '.env.staging',
    production: '.env.production',
};

export const env = process.env.NODE_ENV as ENV;
export const configPath = configPaths[env] || '.env';

// eslint-disable-next-line no-console
console.log(
    `Initializing configuration: NODE_ENV: '${env}'; config path: <root>/'${configPath}'`,
    '\n',
);

dotenv.config({ path: configPath }); 

export const {
  PG_PLATFORM_USER_NAME,
  PG_PLATFORM_DATABASE,
  PG_PLATFORM_PASSWORD,
  PG_PLATFORM_HOST,
  PG_PLATFORM_PORT,
  FIREBASE_DATABASE_URL,
  PORT,
  NODE_ENV,
  CORS_ORIGINS
} = process.env;

