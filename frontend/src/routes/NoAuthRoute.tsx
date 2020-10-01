import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useStores } from '../stores'

/**
 * This route redirect authenticated user (to home) trying to access page only for not authenticated user
 */
const NoAuthRoute = ({ children, ...rest }: RouteProps) => {
	const { userStore } = useStores()

	return (
		<Route {...rest}>
			{userStore.isAuthenticated ? <Redirect to='/' /> : children}
		</Route>
	)
}

export default observer(NoAuthRoute)
