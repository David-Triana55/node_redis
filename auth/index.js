const jwt = require('jsonwebtoken')
const config = require('../config')
const error = require('../utils/error')

function sign (data) {
  return jwt.sign(data, config.secret)
}

function verify (token) {
  return jwt.verify(token, config.secret)
}

const check = {
  own: (req, owner) => {
    const isBearer = req.headers.authorization || ''
    if (!isBearer) {
      throw error('Unauthorized', 401)
    }
    const bearer = isBearer.slice(7)
    const decoded = verify(bearer)
    if (decoded.id !== owner) {
      throw error('Unauthorized', 401)
    }
    req.user = decoded
    return decoded
  },
  logged: (req) => {
    const isBearer = req.headers.authorization || ''
    if (!isBearer) {
      throw error('Unauthorized', 401)
    }
    const bearer = isBearer.slice(7)
    const decoded = verify(bearer)
    console.log(decoded, 'decoded')
    if (!decoded) {
      throw error('Unauthorized', 401)
    }
    req.user = decoded
    return decoded
  }
}

module.exports = {
  sign,
  verify,
  check
}
