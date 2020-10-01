import React from 'react'

interface DefaultLayoutProps {
	children: React.ReactNode
}
const DefaultLayout = ({ children }: DefaultLayoutProps) => (
	<div>{children}</div>
)

export default DefaultLayout
