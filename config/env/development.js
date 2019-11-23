module.exports = {
    "MONGO": {
      "URI": `mongodb://${ process.env.MONGO_HOST || 'database' }:${ process.env.MONGO_PORT || 27017 }/${ process.env.MONGO_DB || 'nodeknockout2019' }`,
      "USERNAME": "",
      "PASSWORD": ""
    },
    "LOGGING": {
      "LEVEL": "debug",
      "LOG_DAYS": "7d",
      "ACTIVITY_LOG_DAYS": "14d"
    }
  }