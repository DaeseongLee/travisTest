const appRoot = require('app-root-path');
const { createLogger, format, transports } = require('winston');
const process = require('process');

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`; // log 출력 포맷 정의
});
const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/log.log`, // 로그파일을 남길 경로
    handleExceptions: true,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: combine(
      label({ label: 'gootHomtsLog' }),
      timestamp(),
      myFormat // log 출력 포맷
    ),
  },
  // 개발 시 console에 출력
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false, // 로그형태를 json으로도 뽑을 수 있다.
    colorize: true,
    format: combine(label({ label: 'nba_express' }), timestamp(), myFormat),
  },
};

const logger = createLogger({
  transports: [new transports.File(options.file)],
  exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({ format: format.simple() }));
}

module.exports = logger;
