import { createLogger, format, transports } from 'winston';

export class WinstonErrorLogger {
  private logFilePath = '';
  private logLevel = 'info';
  public errorLogger: any;

  constructor(serviceName: string) {
    this.logFilePath = `apps/${serviceName}/src/logs/error.log`;
    if (process.env.APP_ENV !== 'production') {
      this.logLevel = 'silly'; //silly
    } else {
      this.logLevel = 'info';
    }

    this.errorLogger = createLogger({
      level: this.logLevel,
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
      defaultMeta: { service: 'api' },
      transports: new transports.File({
        filename: this.logFilePath,
        format: format.combine(
          format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
          format.align(),
          format.printf(
            (info) => `-----error----- ${[info.timestamp]} ${info.message}`
          )
        ),
      }),
    });
    if (process.env.APP_ENV !== 'production') {
      this.errorLogger.add(
        new transports.Console({
          level: this.logLevel || 'silly',

          format: format.combine(
            format.colorize(),
            format.prettyPrint(),
            format.splat(),
            format.printf((info) => {
              if (info instanceof Error) {
                return `-----error----- ${info.timestamp} ${info.message} ${info.stack}`;
              }
              return `-----error----- ${info.timestamp} ${info.message}`;
            })
          ),
          handleExceptions: true,
        })
      );
    } else {
      this.errorLogger.add(
        new transports.Console({
          format: format.combine(
            //format.colorize(),
            format.cli()
          ),
        })
      );
    }
  }
}
