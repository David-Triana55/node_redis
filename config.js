require('dotenv').config()

const config = {
  port: process.env.PORT || 3000,
  secret: process.env.SECRET || 'secret',
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'node_db'
  }
}

module.exports = config
