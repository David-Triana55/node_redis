function success (req, res, message, status) {
  const statusCode = status || 200
  const statusMessage = message || ''

  res.status(status).send({
    error: false,
    status: statusCode,
    body: statusMessage
  })
}

function error (req, res, message, status) {
  const statusCode = status || 500
  const statusMessage = message || 'Internal server error'

  res.status(statusCode).send({
    error: false,
    status,
    body: statusMessage
  })
}

module.exports = { success, error }
