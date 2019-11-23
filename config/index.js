const environment = process.env.NODE_ENV || 'development';

let configFile;

switch (environment) {
    case 'development': {
        configFile = './env/development.js';
        break;
    }
    case 'qa': {
        configFile = './env/qa.js';
        break;
    }
    case 'staging': {
        configFile = './env/staging.js';
        break;
    }
    case 'production': {
        configFile = './env/production.js';
        break;
    }
    default: {
        config = './env/development.js';
    }
}

module.exports = require(configFile);