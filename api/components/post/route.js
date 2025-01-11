const express = require('express')
const Service = require('./index')
const router = express.Router()
const { success } = require('../../../network/response')

router.get('/', async (req, res, next) => {
  try {
    const list = await Service.list()
    success(req, res, list, 200)
  } catch (e) {
    next(e)
  }
})

module.exports = router
