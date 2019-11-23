const winston = require('winston')
	, path = require('path')
	;

require('winston-daily-rotate-file');

const rotateTransport = new (winston.transports.DailyRotateFile)({
	filename: path.resolve('../logs/API/translator.log')
	, datePattern: 'YYYY-MM-DD'
	, format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.simple()
	)
	, prepend: true
	, maxFiles: '7d'
});

const consoleTransport = new (winston.transports.Console)({
	colorize: true
	, format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.colorize(),
		winston.format.simple()
	)
});

const transports = [];

if (process.env.NODE_ENV !== 'production') {
	transports.push(consoleTransport);
}
transports.push(rotateTransport);

var logger = winston.createLogger({
	level: "debug"
	, transports: transports
});

module.exports = logger;