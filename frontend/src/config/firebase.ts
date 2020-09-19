import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyC3WnIJBXKNvFetc_adNeyqh1wIFvV9e5w',
	authDomain: 'sample-project-56093.firebaseapp.com',
	databaseURL: 'https://sample-project-56093.firebaseio.com',
	projectId: 'sample-project-56093',
	storageBucket: 'sample-project-56093.appspot.com',
	messagingSenderId: '98235123149',
	appId: '1:98235123149:web:e3b76b2c67c88f8a5fb084',
	measurementId: 'G-Z7QFQEE8NF',
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

export { auth, firebase }
