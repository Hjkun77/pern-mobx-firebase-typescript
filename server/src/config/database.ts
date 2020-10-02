import deepFreeze from 'simple-deep-freeze';
import {_isStr} from '../helpers/database'

import { 
  PG_PLATFORM_USER_NAME,
  PG_PLATFORM_DATABASE,
  PG_PLATFORM_PASSWORD,
  PG_PLATFORM_HOST,
  PG_PLATFORM_PORT,
  CORS_ORIGINS,
  PORT,
  env, ENV
} from './constants';

export interface ICORSCfg {
  readonly origin: string[],
  readonly credentials: boolean,
}

export interface IDbCfg {
  readonly user: string,
  readonly host: string,
  readonly password: string,
  readonly database: string,
  readonly port: number,
}

export interface IConfig {
  readonly env: ENV,
  readonly isDev: boolean|undefined,
  readonly isStaging: boolean|undefined,
  readonly isTesting: boolean|undefined,
  readonly isProduction: boolean|undefined,
  readonly testUrl: string,
  readonly hasDebug: boolean,
  readonly port: number,
  readonly dbLogging: boolean,
  readonly platform: IDbCfg,
  readonly cors: ICORSCfg,
}

const defaultEnv = {
  env,
  platform: {
      user: PG_PLATFORM_USER_NAME,
      host: PG_PLATFORM_HOST,
      password: PG_PLATFORM_PASSWORD,
      database: PG_PLATFORM_DATABASE,
      port: parseInt(_isStr(PG_PLATFORM_PORT), 10),
  },
  cors: {
      origin: _isStr(CORS_ORIGINS).split(','),
      credentials: true,
  },
  port: parseInt(_isStr(PORT), 10),
  hasDebug: false,
  dbLogging: false,
};


// values to overide default
const development = {
  isDev: true,
  testUrl: `http://localhost:${PORT}`, // used by jest for api testing
  hasDebug: true,
  dbLogging: false,
};

const testing = {
  isTesting: true,
  testUrl: `http://localhost:${PORT}`,
  hasDebug: true,
};

const staging = {
  isStaging: true,
};

const production = {
  isProduction: true,
};

const environments = {
  development,
  testing,
  staging,
  production,
};

if (!environments[env]) {
  throw new Error(
      `Config Environment Error, NODE_ENV="${env}", development|testing|staging|production`,
  );
}

const currentConfig = environments[env];


/**
 * Merge default configuration and env configuraiton to object field level
 * env configuration fields overwrite any similar field from default configuration
 */
const mergeConfig = Object.keys(defaultEnv).reduce(
  (merged, key) => {
      const defaultEnvVal = (defaultEnv as any)[key];
      const currentEnvFieldVal = (currentConfig as any)[key];

      if (typeof defaultEnvVal === 'object' && currentEnvFieldVal) {
          (merged as any)[key] = { ...currentEnvFieldVal, ...defaultEnvVal };
      }

      return merged;
  },
  { ...defaultEnv, ...currentConfig },
);

// => re-asigning value to config is bad practice
// => deepFreeze disallow values to change
const allconfig = deepFreeze(mergeConfig as IConfig);

export default allconfig;
