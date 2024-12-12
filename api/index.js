const express = require('express')
const user = require('./components/user/network')
const app = express()
const config = require('./../config')

const PORT = config.port

app.use(express.json())
app.use('/api/user', user)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
