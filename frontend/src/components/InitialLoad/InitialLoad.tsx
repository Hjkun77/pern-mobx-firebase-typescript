import React, { Fragment, useEffect } from 'react'
import { useStores } from '../../stores'
import * as firebase from '../../config/firebase'
/**
 * Load application initial credential before rendering app
 */

interface InitialLoadProps {
	children: React.ReactNode
}

const InitialLoad = ({ children }: InitialLoadProps) => {
	const { userStore } = useStores()

	useEffect(() => {
		firebase.auth.onAuthStateChanged(authUser =>
			authUser ? userStore.setAuthUser(authUser) : userStore.setAuthUser(null)
		)
	}, [userStore])

	return <Fragment>{children}</Fragment>
}

export default InitialLoad
