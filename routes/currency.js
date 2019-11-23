const express = require('express')
    , router = express.Router()
    ;


 const loadRoutes = () => {
	router.get("/get", currencyController.getCurrency)
    router.post("/set", currencyController.setCurrency)
    // router.delete("/delete", translationProcessController.removeTranslation)
 }   

 module.exports = function(cfg) {
	if (typeof cfg === 'undefined') {
		throw new Error('No config object passed to router.');
	} else if (typeof cfg.models === 'undefined') {
		throw new Error('No models passed to router.');
	} else if (typeof cfg.config === 'undefined') {
		throw new Error('No config passed to router.');
	}

    currencyController = require('../controllers/currencyController')(cfg)
	loadRoutes();
	return router;
};
