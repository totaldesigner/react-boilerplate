import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import Loadable from 'react-loadable'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import App from '../app/containers/App'
import LanguageProvider from '../app/containers/LanguageProvider.connected'
import { translationMessages } from '../app/i18n'
import configureStore from '../app/store'
import { HtmlBuilder } from './htmlBuilder'

let reactLoadableStats: any = {}

if (process.env.NODE_ENV === 'development') {
  reactLoadableStats = require('./react-loadable.json')
}

const serverRenderer = (stats: any): express.RequestHandler => {
  const store = configureStore()

  return (req, res, next) => {
    const modules: any[] = []
    const context: {} = {}

    const component = renderToString(
      <Loadable.Capture report={(moduleName: any) => modules.push(moduleName)}>
        <Provider store={store}>
          <LanguageProvider messages={translationMessages}>
            <StaticRouter context={context} location={req.url}>
              <App />
            </StaticRouter>
          </LanguageProvider>
        </Provider>
      </Loadable.Capture>
    )

    const preloadedState = store.getState()
    const html = new HtmlBuilder(
      process.env.NODE_ENV === 'development' ? reactLoadableStats : stats,
      preloadedState
    )

    res.send(html.renderToString(component, modules))
  }
}

export default serverRenderer
