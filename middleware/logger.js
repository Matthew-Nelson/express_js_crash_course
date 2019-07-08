// we need it here but not in index because THIS is where the moment or module is being used
const moment = require('moment');

// simple middleware function
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
}

module.exports = logger;