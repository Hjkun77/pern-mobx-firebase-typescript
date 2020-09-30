import React from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { auth } from '../../serverless/firebase'

const forgetPasswordSchema = yup.object().shape({
	email: yup.string().trim().required('email is requred'),
})

const initialValues = {
	email: '',
}

const ForgetPassword = () => (
	<div>
		<h1>Forget Password</h1>
		<Formik
			initialValues={initialValues}
			validationSchema={forgetPasswordSchema}
			onSubmit={values =>
				auth
					.doPasswordReset(values.email)
					.then(() => {
						console.log('Reset password successful')
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
					<button type='submit' disabled={isSubmitting}>
						Submit
					</button>
				</Form>
			)}
		</Formik>
	</div>
)

export default ForgetPassword
