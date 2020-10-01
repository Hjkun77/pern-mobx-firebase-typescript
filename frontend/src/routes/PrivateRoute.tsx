import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useStores } from '../stores'

const PrivateRoute = ({ children, ...rest }: RouteProps) => {
	const { userStore } = useStores()

	return (
		<Route {...rest}>
			{!userStore.isAuthenticated ? <Redirect to='/login' /> : children}
		</Route>
	)
}

export default observer(PrivateRoute)
