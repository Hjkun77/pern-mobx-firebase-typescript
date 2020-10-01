import React from 'react'

interface AppLayoutProps {
	children: React.ReactNode
}
const AppLayout = ({ children }: AppLayoutProps) => <div>{children}</div>

export default AppLayout
