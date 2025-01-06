const express = require('express')

const router = express.Router()

const { success, error } = require('../../../network/response')
const Controller = require('./index')

router.post('/login', async (req, res) => {
  try {
    const user = await Controller.login(req.body)
    success(req, res, user, 200)
  } catch (e) {
    error(req, res, e.message, 500)
  }
})

module.exports = router
