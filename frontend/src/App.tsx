import React, { lazy, Fragment } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

// Pages
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const SignUp = lazy(() => import('./pages/SignUp/'))
const ForgetPassword = lazy(() => import('./pages/ForgetPassword/'))

const routes = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/signup',
		component: SignUp,
	},
	{
		path: '/forget-paswword',
		component: ForgetPassword,
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

	const renderRoutes = routes.map(({ path, component }, key) => (
		<Route exact path={path} component={component} key={key} />
	))

	return (
		<Fragment>
			<GlobalStyle />
			<BrowserRouter>
				<Switch>{renderRoutes}</Switch>
			</BrowserRouter>
		</Fragment>
	)
}

export default App
