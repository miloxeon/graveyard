import React from 'react'
import ReactDOM from 'react-dom'
import 'modern-normalize'
import 'inert-polyfill'
import './style.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import App from './components/App'
// import * as serviceWorker from './serviceWorker'

const WrappedApp = (
  <Provider store={ store }>
    <App />
  </Provider>
)

const publish = () => store.dispatch({
  type: 'publish'
})

setInterval(publish, 1000 * 60)
publish()

ReactDOM.render(WrappedApp, document.getElementById('root'))
// serviceWorker.unregister()
