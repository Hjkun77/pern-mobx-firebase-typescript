import { observable, action } from 'mobx'
import RootStore from './rootStore'

class SessionStore {
	public rootStore: RootStore

	@observable authUser: Object | null = null

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore
	}

	@action setAuthUser = (authUser: Object | null) => (this.authUser = authUser)
}

export default SessionStore
