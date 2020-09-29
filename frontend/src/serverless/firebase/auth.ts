import { auth, googleAuthProvider } from '../../config/firebase'

export const doCreateUserWithEmailAndPassword = (
	email: string,
	password: string
) => auth.createUserWithEmailAndPassword(email, password)

export const doSignInWithEmailAndPassword = (email: string, password: string) =>
	auth.signInWithEmailAndPassword(email, password)

export const doSignInWithGoogle = () => auth.signInWithPopup(googleAuthProvider)

export const doSignOut = () => auth.signOut()

export const doPasswordReset = (email: string) =>
	auth.sendPasswordResetEmail(email)

export const doPasswordUpdate = (password: string) =>
	auth.currentUser
		? auth.currentUser.updatePassword(password)
		: Promise.reject(new Error('no current user'))
