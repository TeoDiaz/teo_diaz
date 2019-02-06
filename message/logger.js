const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json, colorize, printf } = format;

const logger = createLogger({
  format: combine(
    colorize(),
    json(),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new transports.Console()]
});

module.exports = logger;
