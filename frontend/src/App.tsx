import React, { lazy, Fragment } from 'react'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { useStores } from './stores'
import { PrivateRoute, NoAuthRoute } from './routes'

// Pages
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const SignUp = lazy(() => import('./pages/SignUp/'))
const ForgetPassword = lazy(() => import('./pages/ForgetPassword/'))

const routes = [
	{
		path: '/home',
		component: <Home />,
		privateRoute: true,
	},
	{
		path: '/login',
		component: <Login />,
		privateRoute: false,
	},
	{
		path: '/signup',
		component: <SignUp />,
		privateRoute: false,
	},
	{
		path: '/forget-password',
		component: <ForgetPassword />,
		privateRoute: false,
	},
]

const App = () => {
	const GlobalStyle = createGlobalStyle`
		html,
		body {
		margin: 0;
		overflow-x: hidden;
		padding: 0;
		scroll-behavior: smooth;
		}
		
		h1,
		h2,
		h3,
		h4,
		h5,
		h6,
		p,
		a,
		button,
		span {
		margin: 0;
		padding: 0;
		}
		
	`

	const renderRoutes = routes.map(({ path, component, privateRoute }, key) => {
		return privateRoute ? (
			<PrivateRoute exact path={path} render={() => component} key={key} />
		) : (
			<NoAuthRoute exact path={path} render={() => component} key={key} />
		)
	})

	const { userStore } = useStores()

	return (
		<Fragment>
			<GlobalStyle />
			<BrowserRouter>
				<Switch>
					<Route
						exact
						path='/'
						render={() => (
							<Redirect
								from='/'
								to={userStore.isAuthenticated ? '/home' : '/login'}
							/>
						)}
					/>
					{renderRoutes}
				</Switch>
			</BrowserRouter>
		</Fragment>
	)
}

export default App
