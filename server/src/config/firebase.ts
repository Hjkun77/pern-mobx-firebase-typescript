// eslint-disable-next-line import/newline-after-import
import admin from 'firebase-admin';
const serviceAccount = require('../serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://sample-project-56093.firebaseio.com'
});

export default admin;
