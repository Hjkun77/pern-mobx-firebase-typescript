import React from 'react'
import { useStores } from '../../stores'

import { auth } from '../../serverless/firebase'

const Home = () => {
	const { userStore } = useStores()

	const toggleLogout = () => {
		userStore.logout()
		return auth.doSignOut()
	}

	return (
		<div>
			<h1>Home Page</h1>
			<h2>Account: {userStore.authUser && userStore.authUser.email}</h2>
			<button type='button' onClick={toggleLogout}>
				Sign Out
			</button>
		</div>
	)
}

export default Home
