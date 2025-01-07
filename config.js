require('dotenv').config()

const config = {
  port: process.env.PORT || 3000,
  secret: process.env.SECRET || 'secret'
}

module.exports = config
