// winston.logger.ts
import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';

@Injectable()
export class WinstonLogger implements LoggerService {
  private logger;

  constructor() {
    this.logger = createLogger({
      transports: [
        new transports.File({
          filename: 'logs/application.log', // file log
          level: 'info',
          format: format.combine(
            format.timestamp(),
            format.printf(({ timestamp, level, message }) => {
              return `${timestamp} [${level.toUpperCase()}] - ${message}`;
            }),
          ),
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}
