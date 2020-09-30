import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
	<div>
		<h1>Home Page</h1>
		<Link to='/login'>Login</Link>
		<Link to='/signup'>Sign Up</Link>
		<Link to='/forget-password'>Forget Password?</Link>
	</div>
)

export default Home
