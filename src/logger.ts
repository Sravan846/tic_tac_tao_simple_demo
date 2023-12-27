import winston from 'winston'
const mydate = new Date();
const newFilename =
  mydate.getFullYear() + '-' + mydate.getMonth() + '-' + mydate.getDate();
  const format = winston.format.combine(
      winston.format.errors({ stack: true }),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
      // winston.format.colorize({ all: true })
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
      )
      // winston.format.prettyPrint()
      // winston.format.json()
    );
const logger = winston.createLogger({
  level: 'info',
  format,
  transports: [new winston.transports.Console({
    format: winston.format.colorize({ all: true })
  }),
  new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
  new winston.transports.File({
    handleExceptions: true,
    filename: `./logs/${newFilename}.log`
  })
  ],
});
export default logger