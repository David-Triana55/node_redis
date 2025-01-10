const Remote = require('./remote')

const config = require('../config')

const remoteDB = new Remote(config.mysqlService.host, config.mysqlService.port)

module.exports = remoteDB
