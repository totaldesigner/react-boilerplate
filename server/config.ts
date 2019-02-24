import path from 'path'
import argv from './argv'
import port from './port'

const env = process.env
const isProd = env.NODE_ENV === 'production'
const isDev = env.NODE_ENV === 'development'

// do not use isProd, isDev ..etc in render.tsx
export default {
  isDev,
  isProd,
  port,
  env: env.NODE_ENV,
  host: argv.host || env.HOST || 'localhost',
  staticPath:
    (isProd && path.resolve(__dirname, '../app')) ||
    path.resolve(__dirname, '../app/public'),
}
