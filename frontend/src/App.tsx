import React, { lazy, Fragment } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
// import { useStores } from './stores'
// import { PrivateRoute, NoAuthRoute } from './routes'

// Layouts
import AppLayout from './layouts/AppLayout'
// Pages
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login/Login'))
const SignUp = lazy(() => import('./pages/SignUp/SignUp'))
const PasswordForget = lazy(
	() => import('./pages/PasswordForget/PasswordForget')
)
const App = () => {
	// const { userStore } = useStores()
	return (
		<Fragment>
			<BrowserRouter>
				<Switch>
					{/* <Route
						exact
						path={'/'}
						render={() => (
							<Redirect
								from='/'
								to={userStore.isAuthenticated ? '/app' : '/login'}
							/>
						)}
					/>
					<NoAuthRoute exact path='/login' render={() => <Login />} />
					<PrivateRoute
						exact
						path='/app'
						render={() => (
							<AppLayout>
								<Home />
							</AppLayout>
						)}
					/> */}
					<Route exact path='/'>
						<AppLayout>
							<Home />
						</AppLayout>
					</Route>
					<Route exact path='/login'>
						<AppLayout>
							<Login />
						</AppLayout>
					</Route>
					<Route exact path='/signup'>
						<AppLayout>
							<SignUp />
						</AppLayout>
					</Route>
					<Route exact path='/password-forget'>
						<AppLayout>
							<PasswordForget />
						</AppLayout>
					</Route>
				</Switch>
			</BrowserRouter>
		</Fragment>
	)
}

export default App
