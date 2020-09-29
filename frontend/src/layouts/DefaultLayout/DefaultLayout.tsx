import React, { Fragment } from 'react'

interface DefaultLayoutProps {
	children: React.ReactNode
}
const DefaultLayout = ({ children }: DefaultLayoutProps) => (
	<Fragment>{children}</Fragment>
)

export default DefaultLayout
