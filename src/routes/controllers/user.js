const express = require('express')
const router = express.Router()
const { checkSchema, validationResult } = require('express-validator')
const UserService = require('../../services/user')
const { userCreate, userLogin, userModify } = require('../schemas/user')
const auth = require('../middlewares/authenticate')

router.get('/', auth(), async (req, res) => {
  let response = null
  try {
    response = await UserService.getAll()
  } catch (err) {
    return res.status(400).json(err)
  }
  return res.status(200).json(response)
})

router.get('/login', checkSchema(userLogin), async (req, res) => {
  let response = null
  try {
    response = await UserService.login(req.body)
  } catch (err) {
    return res.status(400).json(err)
  }
  return res.status(200).json(response)
})

router.post('/create', checkSchema(userCreate), async (req, res) => {
  let response = null
  try {
    validationResult(req).throw()
    response = await UserService.create(req.body)
  } catch (err) {
    return res.status(400).json(err)
  }
  return res.status(200).json(response)
})

router.delete('/delete', auth(), async (req, res) => {

  let response = null
  try {
    validationResult(req).throw()
    response = await UserService.delete(req.body)
  } catch (err) {
    return res.status(400).json(err)
  }
  return res.status(200).json(response)

})

router.put('/modify', auth(), checkSchema(userModify), async (req, res) => {
  let response = null
  try {
    validationResult(req).throw()
    response = await UserService.modify(req.body)
  } catch (err) {
    return res.status(400).json(err)
  }
  return res.status(200).json(response)
})

module.exports = router