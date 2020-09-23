import * as React from 'react'
import { Link, withRouter } from 'react-router-dom'

import { auth, db } from '../../firebase'
import * as routes from '../../constants/routes'
import { updateByPropertyName } from '../../utils'

interface State {
	username: string
	email: string
	passwordOne: string
	passwordTwo: string
	error: { message: string } | null
}

const INITIAL_STATE: State = {
	username: '',
	email: '',
	passwordOne: '',
	passwordTwo: '',
	error: null,
}

class SignUpForm extends React.Component<any, State> {
	constructor(props: any) {
		super(props)
		this.state = { ...INITIAL_STATE }
	}

	onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		const { username, email, passwordOne } = this.state

		const { history } = this.props

		auth
			.doCreateUserWithEmailAndPassword(email, passwordOne)
			.then(authUser => {
				// Create a user in your own accessible Firebase Database too
				db.doCreateUser(authUser?.user?.uid!, username, email)
					.then(() => {
						this.setState(() => ({ ...INITIAL_STATE }))
						history.push(routes.HOME)
					})
					.catch(error => {
						this.setState(updateByPropertyName('error', error))
					})
			})
			.catch(error => {
				this.setState(updateByPropertyName('error', error))
			})

		event.preventDefault()
	}

	render() {
		const { username, email, passwordOne, passwordTwo, error } = this.state

		const isInvalid =
			passwordOne !== passwordTwo ||
			passwordOne === '' ||
			username === '' ||
			email === ''

		return (
			<form onSubmit={this.onSubmit}>
				<input
					value={username}
					onChange={event =>
						this.setState(updateByPropertyName('username', event.target.value))
					}
					type='text'
					placeholder='Full Name'
				/>
				<input
					value={email}
					onChange={event =>
						this.setState(updateByPropertyName('email', event.target.value))
					}
					type='text'
					placeholder='Email Address'
				/>
				<input
					value={passwordOne}
					onChange={event =>
						this.setState(
							updateByPropertyName('passwordOne', event.target.value)
						)
					}
					type='password'
					placeholder='Password'
				/>
				<input
					value={passwordTwo}
					onChange={event =>
						this.setState(
							updateByPropertyName('passwordTwo', event.target.value)
						)
					}
					type='password'
					placeholder='Confirm Password'
				/>
				<button disabled={isInvalid} type='submit'>
					Sign Up
				</button>

				{error && <p>{error.message}</p>}
			</form>
		)
	}
}

const SignUpPage: React.StatelessComponent<{}> = ({ history }: any) => (
	<div>
		<h1>SignUp</h1>
		<SignUpForm history={history} />
	</div>
)

const SignUpLink = () => (
	<p>
		Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
	</p>
)

export default withRouter(SignUpPage)

export { SignUpForm, SignUpLink }
