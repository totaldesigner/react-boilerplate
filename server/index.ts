import express from 'express'
import path from 'path'
import Loadable from 'react-loadable'
import serveFavicon from 'serve-favicon'
import argv from './argv'
import config from './config'
import logger from './logger'
import setup from './middleware'

const { host, port } = config
const ngrok =
  (config.isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false
const app = express()

app.use(serveFavicon(path.resolve(config.staticPath, 'favicon.ico')))
app.use('/static/', express.static(config.staticPath))

setup(app, startServer)

function startServer() {
  Loadable.preloadAll().then(() => {
    app.listen(port, async (err: Error) => {
      if (err) {
        return logger.error(err)
      }

      if (ngrok) {
        let url
        try {
          url = await ngrok.connect(port)
        } catch (e) {
          return logger.error(e)
        }
        logger.appStarted(port, host, url)
      } else {
        logger.appStarted(port, host)
      }
    })
  })
}
