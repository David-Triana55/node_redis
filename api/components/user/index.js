const store = require('./../../../store/remote-mysql')
const ctrl = require('./service')

module.exports = ctrl(store)
