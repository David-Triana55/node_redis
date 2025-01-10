const express = require('express')
const config = require('../config')
const app = express()
const router = require('./route')

app.use(express.json())

// routes
app.use('/', router)

app.listen(config.mysqlService.port, () => {
  console.log('Server is running on port', config.mysqlService.port)
})

module.exports = app
