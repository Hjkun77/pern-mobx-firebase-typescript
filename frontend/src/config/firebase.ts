import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
require('dotenv').config()

const prodConfig = {
	apiKey: process.env.PROD_API_KEY,
	authDomain: process.env.PROD_AUTH_DOMAIN,
	databaseURL: process.env.PROD_DATABASE_URL,
	projectId: process.env.PROD_PROJECT_ID,
	storageBucket: process.env.PROD_STORAGE_BUCKET,
	messagingSenderId: process.env.PROD_MESSAGING_SENDER_ID,
	appId: process.env.PROD_APP_ID,
	measurementId: process.env.PROD_MEASUREMENT_ID,
}

const devConfig = {
	apiKey: 'AIzaSyC3WnIJBXKNvFetc_adNeyqh1wIFvV9e5w',
	authDomain: 'sample-project-56093.firebaseapp.com',
	databaseURL: 'https://sample-project-56093.firebaseio.com',
	projectId: 'sample-project-56093',
	storageBucket: 'sample-project-56093.appspot.com',
	messagingSenderId: '98235123149',
	appId: '1:98235123149:web:e3b76b2c67c88f8a5fb084',
	measurementId: 'G-Z7QFQEE8NF',
}

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig

if (!firebase.apps.length) {
	firebase.initializeApp(config)
}

// const db = firebase.database()
const auth = firebase.auth()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { auth, googleAuthProvider }
