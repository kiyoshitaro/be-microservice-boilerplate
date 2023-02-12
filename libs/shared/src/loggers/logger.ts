import { createLogger, format, transports } from 'winston';

export class WinstonLogger {
  private logFilePath = '';
  private logLevel = 'info';
  public logger: any;

  constructor(serviceName: string) {
    this.logFilePath = `apps/${serviceName}/src/logs/app.log`;
    if (process.env.APP_ENV !== 'production') {
      this.logLevel = 'silly'; //silly
    } else {
      this.logLevel = 'info';
    }

    this.logger = createLogger({
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
            (info) => `-----info----- ${[info.timestamp]}  ${info.message}`
          )
        ),
      }),
    });
    if (process.env.APP_ENV !== 'production') {
      this.logger.add(
        new transports.Console({
          level: this.logLevel || 'silly',

          format: format.combine(
            format.colorize(),
            format.prettyPrint(),
            format.splat(),
            format.printf((info) => {
              if (info instanceof Error) {
                return `-----info-----  ${info.timestamp} ${info.message} ${info.stack}`;
              }
              return `-----info-----  ${info.timestamp} ${info.message}`;
            })
          ),
          handleExceptions: true,
        })
      );
    } else {
      this.logger.add(
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
