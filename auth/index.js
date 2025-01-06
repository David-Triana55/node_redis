const jwt = require('jsonwebtoken')

function sign (data) {
  return jwt.sign(data, 'secret')
}

function verify (token) {
  return jwt.verify(token, 'secret')
}

module.exports = {
  sign,
  verify
}
