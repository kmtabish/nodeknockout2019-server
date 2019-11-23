const winston = require('winston')
	, path = require('path')
	;

require('winston-daily-rotate-file');

const rotateTransport = new (winston.transports.DailyRotateFile)({
	filename: path.resolve('logs/activity.log')
	, datePattern: 'YYYY-MM-DD'
	, format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.simple()
	)
	, prepend: true
	, maxFiles: '14d'
});

const transports = [];
transports.push(rotateTransport);

var logger = winston.createLogger({
	level: 'info'
	, transports: transports
});

module.exports = logger;