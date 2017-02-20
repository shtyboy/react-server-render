import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createStore from '../store'
import { browserHistory, Router } from 'react-router'
import routes from '../routes'

const store = createStore(window.__INITIAL_STATE__)
const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, rootElement
)
