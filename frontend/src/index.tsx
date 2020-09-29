import React, { Suspense } from 'react'
import { createStore, StoreProvider } from './stores'
import ReactDOM from 'react-dom'
import App from './App'
import Loading from './components/Loading'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
	<React.StrictMode>
		<StoreProvider store={createStore()}>
			<Suspense fallback={<Loading />}>
				<App />
			</Suspense>
		</StoreProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
