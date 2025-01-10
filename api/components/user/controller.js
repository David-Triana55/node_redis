const express = require('express')

const { success } = require('../../../network/response')
const Service = require('./index')
const secure = require('./secure')

const router = express.Router()

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
    const user = await Service.get(req.params.id)
    success(req, res, user, 200)
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = await Service.upsert(req.body)
    success(req, res, user, 200)
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await Service.remove(req.params.id)
    success(req, res, user, 200)
  } catch (e) {
    next(e)
  }
})

router.put('/', secure('update'), async (req, res, next) => {
  try {
    const user = await Service.update(req.body.id, req.body)
    success(req, res, user, 200)
  } catch (e) {
    next(e)
  }
})

router.post('/follow/:id', secure('follow'), async (req, res, next) => {
  try {
    console.log(req.user, 'req')
    const user = await Service.follow(req.user.id, req.params.id)
    success(req, res, user, 200)
  } catch (e) {
    next(e)
  }
})

router.get('/:id/following', async (req, res, next) => {
  try {
    const user = await Service.isFollowing(req.params.id)
    success(req, res, user, 200)
  } catch (e) {
    next(e)
  }
})

module.exports = router
