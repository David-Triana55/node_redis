const jwt = require('jsonwebtoken')
const config = require('../config')
const error = require('../utils/error')

function sign (data) {
  return jwt.sign(data, config.secret)
}

function verify (token) {
  return jwt.verify(token, config.secret)
}

function own (req, owner) {
  const isBearer = req.headers.authorization || ''
  if (!isBearer) {
    throw error('Unauthorized', 401)
  }
  const bearer = isBearer.slice(7)
  const decoded = verify(bearer)
  if (decoded.id !== owner) {
    throw error('Unauthorized', 401)
  }
}

module.exports = {
  sign,
  verify,
  own
}
