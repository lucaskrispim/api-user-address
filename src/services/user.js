const bcrypt = require('bcrypt')
const User = require('../models/user')
const Token = require('./auth')

class UserService {
  static async getAll() {
    try {
      return await User.findAll({ raw: true, attributes: ['id','name', 'email', 'phone_number'] })
    } catch (error) {
      return error
    }
  }

  static async login(body) {
    try {
      const user = await User.findOne({ raw: true, where: { "name": body.name } })
      if (user && this.checkUser(body, user)) {
        return {token:Token.getToken(user)}
      } else {
        return { msg: 'Usuário ou senha inválidos' }
      }
    } catch (error) {
      return error
    }
  }

  static async checkUser(body, user) {
    return bcrypt.hashSync(body.password, user.salt) === user.password
  }

  static async create(body) {
    try {
      const user = await User.findOne({ where: { "name": body.name } })
      if (!user) {
        const { name, email, phone_number, password } = body
        const salt = bcrypt.genSaltSync(15)
        const pass = bcrypt.hashSync(password, salt)
        return await User.create({
          name: name,
          email: email,
          phone_number: phone_number,
          password: pass,
          salt: salt,
        })
      } else {
        return { 'msg': 'Este usuário já existe!' }
      }
    } catch (error) {
      return error
    }
  }

  static async delete(body) {
    try {
      const user = await User.findOne({ where: { "id": body.id } })
      if (user) {
        await User.destroy({ where: { "id": body.id } })
        const deleteUser = await User.findOne({ where: { "id": body.id } })
        if (deleteUser) {
          return { 'msg': 'Usuário não deletado!' }
        } else {
          return { 'msg': 'Usuário deletado!' }
        }
      } else {
        return { 'msg': 'Este usuário não existe!' }
      }
    } catch (error) {
      return error
    }
  }

  static async modify(body) {
    try {
      const user = await User.findOne({ where: { "id": body.id } })
      if (user) {

        const salt = (body.password) ? bcrypt.genSaltSync(15) : user.salt
        const password = (body.password) ? bcrypt.hashSync(body.password, salt) : user.password

        await User.update(
          {
            name: body.name ? body.name : user.name,
            email: body.email ? body.email : user.email,
            phone_number: body.phone_number ? body.phone_number : user.phone_number,
            password: password,
            salt: salt,
          },
          { where: { "id": body.id } })
        return await User.findOne({ where: { "id": body.id } })
      } else {
        return { 'msg': 'Este usuário não existe!' }
      }
    } catch (error) {
      return error
    }
  }

}

module.exports = UserService