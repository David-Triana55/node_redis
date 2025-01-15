const express = require('express')

const config = require('../../config')
const post = require('./components/post/route')
const errors = require('../../network/error')
const app = express()

app.use(express.json())

app.use('/api/post', post)
app.use(errors)

app.listen(config.post.port, () => {
  console.log(`post service started on port ${config.post.port}`)
})
