const express = require('express')
const router = express.Router()
const { checkSchema, validationResult } = require('express-validator')
const AddressService = require('../../services/address')
const { addressCreate, addressModify, addressDelete } = require('../schemas/address')
const auth = require('../middlewares/authenticate')

router.get('/', auth(), async (req, res) => {
  let response = null
  try {
    response = await AddressService.getAll(req.body)
  } catch (err) {
    return res.status(400).json(err)
  }
  return res.status(200).json(response)
})

router.post('/create', auth(), checkSchema(addressCreate), async (req, res) => {
  let response = null
  try {
    validationResult(req).throw()
    response = await AddressService.create(req.body)
  } catch (err) {
    return res.status(400).json(err)
  }
  return res.status(200).json(response)
})

router.put('/modify', auth(), checkSchema(addressModify), async (req, res) => {
  let response = null
  try {
    validationResult(req).throw()
    response = await AddressService.modify(req)
  } catch (err) {
    return res.status(400).json(err)
  }
  return res.status(200).json(response)
})

router.delete('/delete', auth(), checkSchema(addressDelete), async (req, res) => {
  let response = null
  try {
    validationResult(req).throw()
    response = await AddressService.delete(req.query)
  } catch (err) {
    return res.status(400).json(err)
  }
  return res.status(200).json(response)
})

module.exports = router