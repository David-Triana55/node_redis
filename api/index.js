const express = require('express')
const user = require('./components/user/route')
const auth = require('./components/auth/route')
const post = require('./components/post/route')
const app = express()
const config = require('./../config')
const errors = require('../network/error')

const PORT = config.port

app.use(express.json())
app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api/post', post)
app.use(errors)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
