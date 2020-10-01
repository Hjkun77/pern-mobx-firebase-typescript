import dotenv from 'dotenv';
import { configPath } from './database'

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


dotenv.config({ path: configPath }); 

