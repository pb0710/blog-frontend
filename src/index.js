import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './assets/styles/preset.scss'
import './common/i18n'
import { JSSBaseline } from 'sylas-react-ui'
import { BrowserRouter } from 'react-router-dom'
import { GlobalLoading } from './components/base'
import { Provider } from 'react-redux'
import store from './store'
import config from './config'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter basename="/blog">
				<JSSBaseline>
					<React.Suspense fallback={<GlobalLoading />} maxDuration={config.LOADING_DELAY}>
						<App />
					</React.Suspense>
				</JSSBaseline>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
