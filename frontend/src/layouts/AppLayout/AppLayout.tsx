import React, { Fragment } from 'react'

interface AppLayoutProps {
	children: React.ReactNode
}
const AppLayout = ({ children }: AppLayoutProps) => (
	<Fragment>{children}</Fragment>
)

export default AppLayout
