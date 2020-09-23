import React from 'react'
import UserStore from './userStore'
import RootStore from './rootStore'

export interface IStore {
	rootStore: RootStore
	userStore: UserStore
}

export function createStore(): IStore {
	const rootStore = new RootStore()
	const userStore = new UserStore(rootStore)

	return {
		rootStore,
		userStore,
	}
}

/**
 * Store handling reference: https://mobx-react.js.org/recipes-context
 */
const StoreContext = React.createContext<IStore | null>(null)

export interface IStoreProvider {
	store: IStore
	children?: any
}

export const StoreProvider = ({ store, children }: IStoreProvider) => (
	<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
)

export function useStores() {
	const store = React.useContext(StoreContext)
	if (!store) {
		throw new Error('useStore must be used within a StoreProvider.')
	}

	return store
}
