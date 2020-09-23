// eslint-disable-next-line import/newline-after-import
import admin from 'firebase-admin';
require('dotenv').config();
const serviceAccount = require('../../serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

export default admin;
