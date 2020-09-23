import React from 'react'
import { inject } from 'mobx-react'

import { firebase } from '../../firebase'
import SessionStore from '../../stores/sessionStore'

interface Props {
	sessionStore: SessionStore
}

const withAuthentication = (Component: React.ComponentClass) => {
	class WithAuthentication extends React.Component<Props, {}> {
		constructor(props: Props) {
			super(props)
		}

		componentDidMount() {
			const { sessionStore } = this.props

			firebase.auth.onAuthStateChanged(authUser => {
				authUser
					? sessionStore.setAuthUser(authUser)
					: sessionStore.setAuthUser(null)
			})
		}

		render() {
			return <Component />
		}
	}

	return inject('sessionStore')(WithAuthentication)
}

export default withAuthentication
