const express = require('express')

const config = require('../../config')
const cache = require('./route')
const error = require('../../utils/error')
const app = express()

app.use(express.json())

app.use('/', cache)
app.use(error)

app.listen(config.cacheService.port, () => {
  console.log('Server is running on port', config.cacheService.port)
})
