import { observable, action, runInAction } from 'mobx'
import RootStore from './rootStore'
import { User } from 'firebase'

class UserStore {
	public rootStore: RootStore

	@observable
	public authUser: User | null = null
	@observable.ref public isAuthenticated: boolean = false

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore
	}

	@action
	public setAuthUser = (authUser: User | null): void => {
		try {
			runInAction(() => {
				this.authUser = authUser
				if (this.authUser) {
					this.isAuthenticated = true
				} else {
					this.isAuthenticated = false
				}
			})
		} catch (err) {
			console.log(err)
		}
	}

	@action
	public logout = async () => {
		try {
			runInAction(() => {
				this.authUser = null
				this.isAuthenticated = false
			})
		} catch (err) {
			console.log(err)
		}
	}
}

export default UserStore
