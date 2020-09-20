import { observable, action } from 'mobx'
import RootStore from './rootStore'

class UserStore {
	public rootStore: RootStore

	@observable
	public users: Object = {}

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore
	}

	@action setUsers = (users: Object) => {
		this.users = users
	}
}

export default UserStore
