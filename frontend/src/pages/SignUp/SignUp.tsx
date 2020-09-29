import React from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import { Formik, Form } from 'formik'
import * as yup from 'yup'

const FILE_SIZE = 160 * 1024
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

const signupSchema = yup.object().shape({
	image: yup
		.mixed()
		.required('A file is required')
		.test(
			'fileSize',
			'File too large',
			value => value && value.size <= FILE_SIZE
		)
		.test(
			'fileFormat',
			'Unsupported Format',
			value => value && SUPPORTED_FORMATS.includes(value.type)
		),
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
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2))
					setSubmitting(false)
				}, 400)
			}}
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
	</DefaultLayout>
)

export default SignUp
