const activityLogger = require('./utils/activityLogger');

module.exports = (mocks, callback) => {
	mocks = mocks || {};

	const express = mocks.express || require('express'),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		path = require('path'),
		config = require('./config/index'),
		app = express(),
		httpStatusCodes = require('./utils/HttpStatusCodes'),
	//	logger = require('./utils/logger'),
		respond = require('./utils/respond');
	let productController;

	// instantiate models and mongo connection
	const models = mocks.models || require('./models');
	const dbUri = config.MONGO.URI;
	console.log(dbUri)
	const dbOptions = {
		user: config.MONGO.USERNAME,
		pass: config.MONGO.PASSWORD,
		useNewUrlParser: true,
		useUnifiedTopology: true
	}

	if (mongoose.connection.readyState !== 1) {
		mongoose.connect(dbUri, dbOptions, (err) => {
			if (err) {
			//	logger.error('MONGO ERROR:: ', err);
				process.exit(1);
			} else {
				console.log("Mongo is running")
			}
		});
	}

	mongoose.connection.on('disconnected', (err) => {
	//	logger.error('disconnected from mongo server.', err);
		process.exit(1);
	});

	const cfg = {
		config: config,
		models: models
	};
	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: false
	}));

	if (process.env.NODE_ENV === 'development') {
		app.use(require('cors')());
	}
	app.use('/', addActivityEntry)

	app.get('/tab', testHomeRoute)

	//app.use(express.static(path.join(__dirname, '/../client/dist')));
	const routes = require('./routes')(cfg);
	app.use('/api/v0', routes);
	// app.use('/*', (req, res) => res.sendFile(path.join(__dirname, '/../client/dist/index.html')));

	// catch 404 and forward to error handler
	app.use((req, res, next) => {
		var errorObj = {
			statusCode: httpStatusCodes.NOT_FOUND,
			error_message: 'REQUESTED RESOURCE DOES NOT EXIST'
		}
		next(JSON.stringify(errorObj));
	});

	app.use((err, req, res, next) => {
		if (typeof err === 'string') {
			err = {
				statusCode: httpStatusCodes.INTERNAL_SERVER_ERROR,
				error_message: err
			}
		}
		if (err.statusCode === httpStatusCodes.NOT_FOUND) {
			return respond.send404(req, res);
		}
		if (typeof err === 'object' && !err.error_message) {
			err.error_message = 'some error occurred';
		}
		respond.send500(req, res, err);
	})

	callback(app);
};
const testHomeRoute = (req, res, next) =>{
	res.send("Hello World")
}
const addActivityEntry = (req, res, next) => {
//	activityLogger.info(req.url);
	next();
}
