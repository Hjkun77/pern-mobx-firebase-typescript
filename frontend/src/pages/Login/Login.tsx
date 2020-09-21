import * as React from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'

import * as routes from '../../constants/routes'
import { auth, db } from '../../firebase'
import { PasswordForgetLink } from '../PasswordForget/PasswordForget'
import { SignUpLink } from '../SignUp/SignUp'

interface IState {
	username: string
	email: string
	password: string
	error: { message: string } | null
}

const INIT_STATE = {
	email: '',
	error: null,
	password: '',
	username: '',
}

const SignInPageContent = styled.div`
	min-height: calc(100vh - 56px);
`

const SignInWithGoogle = styled.button`
	background-color: #ea4335;
	border-color: #ea4335;
	transition: filter 0.15s ease-in-out;
	&:hover {
		background-color: #ea4335;
		border-color: #ea4335;
		filter: brightness(90%);
	}
`

const SignInLink = () => (
	<p className='lead'>
		Already have an account? <Link to={routes.SIGN_IN}>Sign in</Link>
	</p>
)

class SignInForm extends React.Component<any, IState> {
	constructor(props: any) {
		super(props)
		this.state = { ...INIT_STATE }

		this.onEmailInputChange = this.onEmailInputChange.bind(this)
		this.onPasswordInputChange = this.onPasswordInputChange.bind(this)
	}

	public onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		const { email, password } = this.state
		const { history } = this.props

		auth
			.doSignInWithEmailAndPassword(email, password)
			.then(() => {
				this.setState(() => ({ ...INIT_STATE }))
				history.push(routes.LANDING)
			})
			.catch(error => {
				this.setState({ error })
			})

		event.preventDefault()
	}

	public onGoogleSignIn = () => {
		const { history } = this.props

		auth.doSignInWithGoogle().then(authUser =>
			db.checkIfUserExist(authUser?.user?.uid!).then(() =>
				db
					.doCreateUser(
						authUser?.user?.uid!,
						authUser?.user?.displayName!,
						authUser?.user?.email!
					)
					.then(() => {
						this.setState(() => ({ ...INIT_STATE }))
						history.push(routes.LANDING)
					})
			)
		)
	}

	public onEmailInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ email: event.target.value })
	}

	public onPasswordInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		this.setState({ password: event.target.value })
	}

	public render() {
		const { email, password, error } = this.state
		const isInvalid = password === '' || email === ''

		return (
			<div className='my-3'>
				<form onSubmit={this.onSubmit}>
					<div className='form-group'>
						<input
							value={this.state.email}
							onChange={this.onEmailInputChange}
							className='form-control form-control-lg'
							type='text'
							placeholder='Email'
						/>
					</div>
					<div className='form-group'>
						<input
							value={this.state.password}
							onChange={this.onPasswordInputChange}
							className='form-control form-control-lg'
							type='password'
							placeholder='Password'
						/>
					</div>
					<button
						className='btn btn-primary btn-lg btn-block'
						disabled={isInvalid}
						type='submit'
					>
						Sign in
					</button>

					{error && <p>{error.message}</p>}
				</form>
				<p className='mt-3'>OR</p>
				<SignInWithGoogle
					className='btn btn-primary btn-lg btn-block'
					onClick={this.onGoogleSignIn}
				>
					Sign in with Google
				</SignInWithGoogle>
			</div>
		)
	}
}

const Login = ({ history }: any) => (
	<SignInPageContent className='row align-items-center justify-content-center py-3'>
		<main className='col-12 col-md-6 col-lg-4 text-center' role='main'>
			<h1>Sign in</h1>
			<SignUpLink />
			<SignInForm history={history} />
			<PasswordForgetLink />
		</main>
	</SignInPageContent>
)

export default withRouter(Login)

export { SignInForm, SignInLink }
