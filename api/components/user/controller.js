const express = require('express')

const { success } = require('../../../network/response')
const Controller = require('./index')
const secure = require('./secure')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const list = await Controller.list()
    success(req, res, list, 200)
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await Controller.get(req.params.id)
    success(req, res, user, 200)
  } catch (e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = await Controller.upsert(req.body)
    success(req, res, user, 200)
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await Controller.remove(req.params.id)
    success(req, res, user, 200)
  } catch (e) {
    next(e)
  }
})

router.put('/', secure('update'), async (req, res, next) => {
  try {
    const user = await Controller.update(req.body.id, req.body)
    success(req, res, user, 200)
  } catch (e) {
    next(e)
  }
})

router.post('/follow/:id', secure('follow'), async (req, res, next) => {
  try {
    console.log(req.user, 'req')
    const user = await Controller.follow(req.user.id, req.params.id)
    success(req, res, user, 200)
  } catch (e) {
    next(e)
  }
})

router.get('/:id/following', async (req, res, next) => {
  try {
    const user = await Controller.isFollowing(req.params.id)
    success(req, res, user, 200)
  } catch (e) {
    next(e)
  }
})

module.exports = router
