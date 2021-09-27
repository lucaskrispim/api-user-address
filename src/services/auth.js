const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

const privateKey = fs.readFileSync(path.resolve(__dirname, '../../secret.key.pem')) || "123456789"

class Token{
  static getToken(user){
    const payload = {
      name: user.name,
      id: user.id,
      flag:true,
      exp: Math.floor(Date.now() / 1000) + 6000,
      iat: Math.floor(Date.now() / 1000),
    }
    return jwt.sign(payload, privateKey, { algorithm: 'RS256' })
  }

  static decodeToken(req){
    try {
      return jwt.verify(req.headers.token, privateKey, { algorithms: ['RS256'] })
    } catch (error) {
      return false
    }
  }
}

module.exports = Token


