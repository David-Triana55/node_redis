const express = require('express')
const user = require('./components/user/controller')
const auth = require('./components/auth/controller')
const app = express()
const config = require('./../config')
const errors = require('../network/error')

const PORT = config.port

app.use(express.json())
app.use('/api/user', user)
app.use('/api/auth', auth)
app.use(errors)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
