import * as React from 'react'
import { Link } from 'react-router-dom'

import { auth } from '../../firebase'
import * as routes from '../../constants/routes'
import { updateByPropertyName } from '../../utils'

interface State {
	email: string
	error: { message: string } | null
}

const INITIAL_STATE: State = {
	email: '',
	error: null,
}

const PasswordForgetLink: React.StatelessComponent = () => (
	<p>
		<Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
	</p>
)

class PasswordForgetForm extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props)
		this.state = { ...INITIAL_STATE }
	}

	onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		const { email } = this.state

		auth
			.doPasswordReset(email)
			.then(() => {
				this.setState(() => ({ ...INITIAL_STATE }))
			})
			.catch(error => {
				this.setState(updateByPropertyName('error', error))
			})

		event.preventDefault()
	}

	render() {
		const { email, error } = this.state

		const isInvalid = email === ''

		return (
			<form onSubmit={this.onSubmit}>
				<input
					value={this.state.email}
					onChange={event =>
						this.setState(updateByPropertyName('email', event.target.value))
					}
					type='text'
					placeholder='Email Address'
				/>
				<button disabled={isInvalid} type='submit'>
					Reset My Password
				</button>

				{error && <p>{error.message}</p>}
			</form>
		)
	}
}

const PasswordForget = () => (
	<div>
		<h1>PasswordForget</h1>
		<PasswordForgetForm />
	</div>
)

export default PasswordForget

export { PasswordForgetForm, PasswordForgetLink }
