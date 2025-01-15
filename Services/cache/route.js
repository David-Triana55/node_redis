const express = require('express')
const router = express.Router()

const response = require('../../network/response.js')
const store = require('../../store/redis.js')

router.get('/:table', list)
router.post('/:table', upsert)
router.get('/:table/:id', get)
router.post('/:table/:id', insert)

async function list (req, res, next) {
  try {
    const data = await store.list(req.params.table)
    response.success(req, res, data, 200)
  } catch (e) {
    next(e)
  }
}

async function upsert (req, res, next) {
  try {
    console.log('upsert', req.body)
    const data = await store.upsert(req.params.table, req.body)
    response.success(req, res, data, 201)
  } catch (e) {
    next(e)
  }
}

async function get (req, res, next) {
  try {
    const data = await store.get(req.params.table, req.params.id)
    response.success(req, res, data, 200)
  } catch (e) {
    next(e)
  }
}

async function insert (req, res, next) {
  try {
    const data = await store.insert(req.params.table, req.params.id, req.body)
    response.success(req, res, data, 201)
  } catch (e) {
    next(e)
  }
}

module.exports = router
