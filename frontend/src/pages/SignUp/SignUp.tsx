import React from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { auth } from '../../serverless/firebase'

// const FILE_SIZE = 160 * 1024
// const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

const signupSchema = yup.object().shape({
	name: yup.string().trim().required('name is requred'),
	email: yup.string().trim().required('email is requred'),
	password: yup.string().trim().required('password is requred'),
	passwordConfirm: yup
		.string()
		.trim()
		.oneOf([yup.ref('password')], 'Passwords must match')
		.required('password confirmation is requred'),
})

const initialValues = {
	name: '',
	email: '',
	password: '',
	passwordConfirm: '',
}

const SignUp = () => (
	<DefaultLayout>
		<Formik
			initialValues={initialValues}
			validationSchema={signupSchema}
			onSubmit={values =>
				auth
					.doCreateUserWithEmailAndPassword(values.email, values.password)
					.then(authUser =>
						console.log(
							'Sign Up Successful with the following creds:',
							authUser?.user?.uid!,
							values.email,
							values.password,
							values.name
						)
					)
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
						type='text'
						name='name'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.name}
					/>
					{errors.name && touched.name && errors.name}
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
					<input
						type='password'
						name='passwordConfirm'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.passwordConfirm}
					/>
					{errors.passwordConfirm &&
						touched.passwordConfirm &&
						errors.passwordConfirm}
					<button type='submit' disabled={isSubmitting}>
						Submit
					</button>
				</Form>
			)}
		</Formik>
	</DefaultLayout>
)

export default SignUp
