const auth = require('../../../auth')

function checkAuth (action) {
  return (req, res, next) => {
    switch (action) {
      case 'update': {
        const owner = req.body.id
        auth.check.own(req, owner)
        next()
        break
      }
      case 'follow': {
        auth.check.logged(req)
        next()
        break
      }
      default:
        next()
    }
  }
}

module.exports = checkAuth
