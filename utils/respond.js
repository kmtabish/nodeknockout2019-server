var httpStatusCodes = require('./HttpStatusCodes')
	//, logger = require('./logger')
	;


const send400 = (req, res, err = { error_message: 'Invalid parameters' })=> {
	res.status(httpStatusCodes.BAD_REQUEST)
//	logger.error(getError(req, err));
	return res.send(err);
}

const send401 = (req, res, err = { error_message: 'Unauthorized user' }) => {
	res.status(httpStatusCodes.UNAUTHORIZED);
//	logger.error(getError(req, err));
	return res.send(err);
}

const send403 = (req, res, err = { error_message: 'Forbidden request'}) => {
	res.status(httpStatusCodes.FORBIDDEN);
	//logger.error(getError(req, err));
	return res.send(err);
}

const send404 = (req, res, err = { error_message: 'Resource requested does not exist' }) => {
	res.status(httpStatusCodes.NOT_FOUND)
	//logger.error(getError(req, err));
	return res.send(err);
}

const send200 = (req, res, json) => {
	res.status(httpStatusCodes.SUCCESS);
	return res.json(json || {});
}

const send500 = (req, res, err = { error_message: 'Some error occurred' }) => {
	//logger.error(getError(req, err));
	res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
	if (err.error_message) {
		err.error_message = Object.keys(err.error_message).length ? err.error_message : 'some error occurred'
	}
	return res.send(err);
}

const getError = (req, err) => {
	let errorObj = Object.assign({}, err)
		, error
		;
	
	if (typeof err === 'object' && err !== null) {
		if (err.error_message && err.error_message.stack) {
			errorObj.error_message = err.error_message.stack;
		}
		error = JSON.stringify(errorObj);
	} else {
		error = err;
	}
	return `on ${ req.originalUrl } giving error : "${ error }"`;
}

module.exports = {
	send200
	, send400
	, send401
	, send403
	, send404
	, send500
};