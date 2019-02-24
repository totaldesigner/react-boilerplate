import { Application } from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import config from './config'

export default (app: Application, startServer: () => void) => {
  if (config.isProd) {
    const serverRenderer = require('./render').default
    const reactLoadableStats = require('./react-loadable.json')
    const webpackStats = require('./stats.json')
    const stats = { ...reactLoadableStats, ...webpackStats }
    app.use(serverRenderer(stats))
    startServer()
  } else {
    let started = false
    const webpackConfig = [
      require('../webpack.app.dev'),
      { ...require('../webpack.server'), mode: 'development' },
    ]
    const appConfig: webpack.Configuration = webpackConfig[0]
    const compiler: webpack.MultiCompiler = webpack(webpackConfig)

    app.use(
      webpackDevMiddleware(compiler, {
        publicPath:
          appConfig.output && appConfig.output.publicPath
            ? appConfig.output.publicPath
            : '',
        serverSideRender: true,
      })
    )

    if (compiler.compilers) {
      app.use(
        webpackHotMiddleware(<webpack.Compiler>(
          compiler.compilers.find((c: webpack.Compiler) => c.name === 'app')
        ))
      )
    }

    app.use(webpackHotServerMiddleware(compiler))
    compiler.plugin('done', () => {
      if (!started) {
        started = true
        startServer()
      }
    })
  }

  return app
}
