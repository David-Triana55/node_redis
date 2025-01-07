function error (message, code) {
  const e = new Error(message)
  e.statusCode = code
  return e
}

module.exports = error
