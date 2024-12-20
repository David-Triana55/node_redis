const express = require('express')
const user = require('./components/user/network')
const auth = require('./components/auth/network')
const app = express()
const config = require('./../config')

const PORT = config.port

app.use(express.json())
app.use('/api/user', user)
app.use('/api/auth', auth)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
