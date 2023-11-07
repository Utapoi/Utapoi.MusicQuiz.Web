import winston, { format, transports } from 'winston'

const { combine, timestamp, label, printf } = format

const UtapoiFormat = printf(({ message, label, timestamp }) => {
  return `${timestamp} [${label}]: ${message}`
})

export function useLogger(name: string) {
  const InternalLogger = winston.createLogger({
    level: 'info',
    format: combine(
      label({ label: name }),
      timestamp(),
      UtapoiFormat,
    ),
    transports: [new transports.Console()],
  })

  function Info(message: string) {
    InternalLogger.info(message)
  }

  function Warning(message: string) {
    InternalLogger.warn(message)
  }

  function Error(message: string) {
    InternalLogger.error(message)
  }

  function Debug(message: string) {
    InternalLogger.debug(message)
  }

  return {
    Info,
    Warning,
    Error,
    Debug,
  }
}
