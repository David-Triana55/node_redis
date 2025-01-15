require('dotenv').config()

const config = {
  port: process.env.PORT || 3000,
  secret: process.env.SECRET || 'secret',
  mysql: {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'node_db'
  },
  mysqlService: {
    port: process.env.MYSQL_SRV_PORT || 3001,
    host: process.env.MYSQL_SRV_HOST || 'localhost'
  },
  post: {
    port: process.env.POST_PORT || 3002
  },
  cacheService: {
    port: process.env.CACHE_PORT || 6379,
    host: process.env.CACHE_HOST || 'localhost'
  }
}

module.exports = config
