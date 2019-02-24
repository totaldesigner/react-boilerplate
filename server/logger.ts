import chalk from 'chalk'
import ip from 'ip'

const divider = chalk.gray('\n-----------------------------------')

const logger = {
  error: (err: Error) => {
    console.error(chalk.red(String(err)))
  },

  appStarted: (port: number, host: string, tunnelStarted?: string) => {
    console.log(`Server started ! ${chalk.green('✓')}`)

    if (tunnelStarted) {
      console.log(`Tunnel initialised ${chalk.green('✓')}`)
    }

    console.log(`
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://${host}:${port}`)}
      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`) +
        (tunnelStarted
          ? `\n    Proxy: ${chalk.magenta(tunnelStarted)}`
          : '')}${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `)
  },
}

export default logger
