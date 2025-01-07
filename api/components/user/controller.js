const express = require('express')

const { success, error } = require('../../../network/response')
const Controller = require('./index')
const secure = require('./secure')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const list = await Controller.list()
    success(req, res, list, 200)
  } catch (e) {
    error(req, res, e.message, 500)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await Controller.get(req.params.id)
    success(req, res, user, 200)
  } catch (e) {
    error(res, res, e.message, 500)
  }
})

router.post('/', async (req, res) => {
  try {
    const user = await Controller.upsert(req.body)
    success(req, res, user, 200)
  } catch (e) {
    error(req, res, e.message, 500)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const user = await Controller.remove(req.params.id)
    console.log(req.user, 'req.user')
    success(req, res, user, 200)
  } catch (e) {
    error(req, res, e.message, 500)
  }
})

router.put('/', secure('update'), async (req, res) => {
  try {
    const user = await Controller.upsert(req.body)
    success(req, res, user, 200)
  } catch (e) {
    error(req, res, e.message, 500)
  }
})

module.exports = router
