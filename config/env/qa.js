module.exports = {
    "MONGO": {
      "URI": `mongodb://${ process.env.MONGO_USER || 'kmt' }:${ process.env.MONGO_PASS || 'black_1' }@${ process.env.MONGO_HOST || 'ds249267.mlab.com' }:${ process.env.MONGO_PORT || 49267 }/${ process.env.MONGO_DB || 'nodeknockout2019' }`,
    },
    "LOGGING": {
      "LEVEL": "debug",
      "LOG_DAYS": "7d",
      "ACTIVITY_LOG_DAYS": "14d"
    }
  }