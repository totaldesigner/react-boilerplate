import './utils/polyfills'

import React from 'react'
import ReactDOM from 'react-dom'
import Loadable from 'react-loadable'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import App from './containers/App'
import LanguageProvider from './containers/LanguageProvider.connected'
import { translationMessages } from './i18n'
import configureStore from './store'
import history from './utils/history'

import './styles.scss'

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const store = configureStore(preloadedState)

const component = (
  <Provider store={store}>
    <LanguageProvider messages={translationMessages}>
      <ConnectedRouter store={store} history={history}>
        <Router>
          <App />
        </Router>
      </ConnectedRouter>
    </LanguageProvider>
  </Provider>
)

const render = () => {
  const root = document.getElementById('root')!
  Loadable.preloadReady().then(() => {
    if (root.hasChildNodes()) {
      ReactDOM.hydrate(component, root)
    } else {
      ReactDOM.render(component, root)
    }
  })
}

if (!global.Intl) {
  require.ensure(
    ['intl', 'intl/locale-data/jsonp/en.js', 'intl/locale-data/jsonp/ko.js'],
    () => {
      require('intl')
      require('intl/locale-data/jsonp/en.js')
      require('intl/locale-data/jsonp/ko.js')
      render()
    }
  )
} else {
  render()
}
