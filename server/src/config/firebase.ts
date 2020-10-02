// eslint-disable-next-line import/newline-after-import
import admin from 'firebase-admin';
import { FIREBASE_DATABASE_URL } from './constants';
const serviceAccount = require('../../serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: FIREBASE_DATABASE_URL
});

export default admin;
