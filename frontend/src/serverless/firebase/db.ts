import { db } from '../../config/firebase'

export const doCreateUser = (id: string, username: string, email: string) =>
	db.ref(`users/${id}`).set({
		username,
		email,
	})

export const onceGetUsers = () => db.ref('users').once('value')

export const checkIfUserExist = (id: string) =>
	db.ref(`users/${id}/email`).once('value', snapshot => {
		if (snapshot.exists() !== true) {
			return
		}
	})
