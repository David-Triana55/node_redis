const express = require('express')

const router = express.Router()

const { success } = require('../../../network/response')
const Service = require('./index')

router.post('/login', async (req, res, next) => {
  try {
    const user = await Service.login(req.body)
    success(req, res, user, 200)
  } catch (e) {
    next(e)
  }
})

module.exports = router
