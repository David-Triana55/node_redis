const express = require('express')
const Service = require('./index')
const router = express.Router()
const { success } = require('../../../../network/response')
const secure = require('../../../../utils/secure')

router.get('/', async (req, res, next) => {
  try {
    const list = await Service.list()
    success(req, res, list, 200)
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const data = await Service.get(req.params.id)
    success(req, res, data, 200)
  } catch (e) {
    next(e)
  }
})

router.post('/', secure('createPost'), async (req, res, next) => {
  try {
    const data = await Service.upsert(req)
    success(req, res, data, 201)
  } catch (e) {
    next(e)
  }
})

module.exports = router
