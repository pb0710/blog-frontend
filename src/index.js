import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './assets/styles/preset.scss'
import * as serviceWorker from './serviceWorker'
import { JSSBaseline } from 'sylas-react-ui'
import { BrowserRouter } from 'react-router-dom'
import { GlobalLoading } from './components/base'
import { Provider } from 'react-redux'
import store from './store'
import './common/i18n'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<JSSBaseline>
					<React.Suspense fallback={<GlobalLoading />}>
						<App />
					</React.Suspense>
				</JSSBaseline>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
