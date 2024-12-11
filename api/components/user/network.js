const express = require('express')

const response = require('../../../network/response')
const Controller = require('./index')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const list = await Controller.list()
    response.success(req,res,list,200)
  } catch (e) {
    response.error(req,res,e.message, 500)
  }

})

router.get('/:id', async  (req, res) => {
  try {
    const user = await Controller.get(req.params.id)
    response.success(req,res,user,200)
  } catch (e) {
    response.error(res,res,e.message,500)
  }

})

module.exports = router
