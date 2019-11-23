const express = require('express')
    , router = express.Router()
    ;


 const loadRoutes = () => {
	router.post("/raw", translationProcessController.insertTranslation)
    router.delete("/raw", translationProcessController.removeTranslation)
 }   

 module.exports = function(cfg) {
	if (typeof cfg === 'undefined') {
		throw new Error('No config object passed to router.');
	} else if (typeof cfg.models === 'undefined') {
		throw new Error('No models passed to router.');
	} else if (typeof cfg.config === 'undefined') {
		throw new Error('No config passed to router.');
	}

    translationProcessController = require('../controllers/importTranslationController')(cfg)
	loadRoutes();
	return router;
};
