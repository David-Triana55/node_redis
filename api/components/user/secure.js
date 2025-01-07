const auth = require('../../../auth')

function checkAuth (action) {
  return (req, res, next) => {
    switch (action) {
      case 'update':
        const owner = req.body.id
        auth.own(req, owner)
        next()
        break
      default:
        next()
    }
  }
}

module.exports = checkAuth
