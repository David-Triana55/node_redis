const express = require('express')
const router = express.Router()
const store = require('../store/mysql')
const response = require('../network/response')

// routes

router.get('/:table', list)
router.get('/:table/:id', get)
router.post('/:table', upsert)
router.put('/:table', update)
router.delete('/:table', remove)

// internal functions

async function list (req, res, next) {
  try {
    const data = await store.list(req.params.table)
    response.success(req, res, data, 200)
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

async function upsert (req, res, next) {
  try {
    const data = await store.upsert(req.params.table, req.body)
    response.success(req, res, data, 200)
  } catch (e) {
    next(e)
  }
}

async function update (req, res, next) {
  try {
    const data = await store.update(req.params.table, req.body)
    response.success(req, res, data, 200)
  } catch (e) {
    next(e)
  }
}

async function remove (req, res, next) {
  try {
    const data = await store.remove(req.params.table, req.body)
    response.success(req, res, data, 200)
  } catch (e) {
    next(e)
  }
}

module.exports = router
