const getCurrency = (req, res, next) => {
    const currency= currencyService.getCurrency();
    currency.then((successInfo) =>{
		res.send(successInfo)
	}).catch((errInfo) =>{
		res.send(errInfo)
	})
}

const setCurrency = (req, res, next) => {
		const bodypayload = req.body;
		const currency = currencyService.getCurrency(bodypayload, res);
		currency.forEach(data=>data.then((successInfo) =>{
			res.send(successInfo)
		}).catch((errInfo) =>{
			res.send(errInfo)
		}))
}

const deleteCurrency = (req, res, next) => {
    const currency = currencyService.removeCurrency();
    currency.then((successInfo) =>{
		res.send(successInfo)
	}).catch((errInfo) =>{
		res.send(errInfo)
	})
}

const currencyController = {
	getCurrency,
	setCurrency,
  deleteCurrency
}

module.exports = function(cfg) {
	if (typeof cfg === 'undefined') {
		throw new Error('No config object passed to router.');
	} else if (typeof cfg.models === 'undefined') {
		throw new Error('No models passed to router.');
	} else if (typeof cfg.config === 'undefined') {
		throw new Error('No config passed to router.');
	}

	currencyService = require('../services/currencyService')(cfg);
	return currencyController;
};
