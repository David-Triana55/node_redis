const store = require('./../../../store/remote-mysql')
const ctrl = require('./service')
const cache = require('../../../store/redis')
module.exports = ctrl(store, cache)
