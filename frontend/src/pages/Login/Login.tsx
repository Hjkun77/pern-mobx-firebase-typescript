import React from 'react'
import DefaultLayout from '../../layouts/DefaultLayout'
import { Formik, Form } from 'formik'
import * as yup from 'yup'

const loginSchema = yup.object().shape({
	email: yup.string().trim().required('email is requred'),
	password: yup.string().trim().required('password is requred'),
})

const initialValues = {
	email: '',
	password: '',
}

const Login = () => (
	<DefaultLayout>
		<Formik
			initialValues={initialValues}
			validationSchema={loginSchema}
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

export default Login
