const authService = require('../../services/auth')

const auth = () => (req, res, next) => {
  try {
    const verify = authService.decodeToken(req)
    if (verify) {
      req.body.name = (req.body.name) ? req.body.name : verify.name
      req.body.id = (req.body.id) ? req.body.id : verify.id

      return next()
    } else {
      return res.status(400).json({ msg: 'O usuário não está logado no sistema!' })
    }
  } catch (error) {
    return res.status(400).json({ msg: 'O usuário não está logado no sistema!' })
  }
}

module.exports = auth