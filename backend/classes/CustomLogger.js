import winston from "winston";

/**
 * Adapter for logger
 */
class Logger {
  constructor() {
    const errorStackFormat = winston.format((err) => {
      if (err.level == "error") {
        return Object.assign({}, err, {
          stack: err.stack,
          message: err.message,
        });
      }
      return err;
    });

    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      transports: [
        new winston.transports.File({
          filename: `failedResults.log`,
        }),
      ],
    });
  }

  trace(...args) {
    this.logger.trace(...args);
  }
  debug(...args) {
    this.logger.debug(...args);
  }
  info(...args) {
    this.logger.info(...args);
  }
  warn(...args) {
    this.logger.warn(...args);
  }
  error(...args) {
    this.logger.error(...args);
  }
}

export default new Logger();
