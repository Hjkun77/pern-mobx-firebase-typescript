import React from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { auth } from '../../serverless/firebase'

const loginSchema = yup.object().shape({
	email: yup.string().trim().required('email is requred'),
	password: yup.string().trim().required('password is requred'),
})

const initialValues = {
	email: '',
	password: '',
}

const Login = () => {
	const onGoogleSignIn = () =>
		auth
			.doSignInWithGoogle()
			.then(authUser =>
				console.log(
					authUser?.user?.uid!,
					authUser?.user?.displayName!,
					authUser?.user?.email!
				)
			)

	return (
		<DefaultLayout>
			<Formik
				initialValues={initialValues}
				validationSchema={loginSchema}
				onSubmit={values =>
					auth
						.doSignInWithEmailAndPassword(values.email, values.password)
						.then(() => {
							console.log('Login Success')
						})
						.catch(error => {
							console.log(error)
						})
				}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					isSubmitting,
				}) => (
					<Form>
						<input
							type='email'
							name='email'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.email}
						/>
						{errors.email && touched.email && errors.email}
						<input
							type='password'
							name='password'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.password}
						/>
						{errors.password && touched.password && errors.password}
						<button type='submit' disabled={isSubmitting}>
							Submit
						</button>
					</Form>
				)}
			</Formik>
			<button onClick={onGoogleSignIn}>Sign in With Google</button>
		</DefaultLayout>
	)
}

export default Login
