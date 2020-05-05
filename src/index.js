import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { makeStyles } from '@material-ui/styles'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'store'
import 'normalize.css'
import './index.css'
import AppBar from 'components/AppBar'
import Content from 'components/Content'

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    // background: 'pink',
    background: '#f6f6f6',
    overflowY: 'auto',
    // display: 'flex',
    // flexWrap: 'wrap',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
})

function App() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar />
      <Content />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
