import debug from 'debug'

if (process.env.NODE_ENV !== 'production') {
  debug.enable(`DEBUG`)
}

export const createDebugger = (namespace: string) =>
  debug(`${namespace}`)

export default createDebugger(`DEBUG`)
