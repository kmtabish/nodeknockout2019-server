const express = require('express')
    , router = express.Router()
    ;

 const loadRoutes = (cfg) => {
    const importTranslation = require('./importTranslationRoute')(cfg)
    const currency = require('./currency')(cfg)

    router.use("/", importTranslation)
    router.use("/currency", currency)
 }   

 module.exports = (cfg) => {
   if (typeof cfg === 'undefined') {
      throw new Error('No config object passed to router.');
   } else if (typeof cfg.models === 'undefined') {
      throw new Error('No models passed to router.');
   } else if (typeof cfg.config === 'undefined') {
      throw new Error('No config passed to router.');
   }

   loadRoutes(cfg);
   return router;
};
