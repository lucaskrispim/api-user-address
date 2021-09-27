const Address = require('../models/address')
const User = require('../models/user')

class AddressService {
  static async getAll(body) {
    try {
      return await Address.findAll({
        include: { association: 'user', attributes: ['name'] },
        //where: { "user_id": body.id },
        raw: true,
        attributes: ['id','street', 'number', 'zip_code']
      })
    } catch (error) {
      return error
    }
  }

  static async create(body) {
    try {
      const user = await User.findOne({ raw: true, where: { "id": body.id } })
      if (user) {
        const { street, number, zip_code } = body
        return await Address.create({
          user_id: user.id,
          street: street,
          number: number,
          zip_code: zip_code,
        })
      } else {
        return { 'msg': 'Este usuário não existe!' }
      }
    } catch (error) {
      return error
    }
  }

  static async delete(id) {
    try {
      const address = await Despesa.findOne({ where: { "id": id } })
      if (address) {
        await Address.destroy({ where: { "id": id } })
        const deleteAddress = await Despesa.findOne({ where: { "id": id } })
        if (deleteAddress) {
          return { 'msg': 'O endereço não foi deletado!' }
        } else {
          return { 'msg': 'Endereço deletada!' }
        }
      } else {
        return { 'msg': 'O endereço não existe!' }
      }
    } catch (error) {
      return error
    }
  }

  static async modify(req) {
    try {
      const address = await Address.findOne({ where: { "id": req.query.id, "user_id": req.body.id } })
      if (address) {
        await Address.update(
          {
            street: req.body.street ? req.body.street : address.street,
            number: req.body.number ? req.body.number : address.number,
            user_id: req.body.user_id ? req.body.user_id : address.user_id,
            zip_code: req.body.zip_code ? req.body.zip_code : address.zip_code,
          },
          { where: { "id": req.query.id } })
        return await Address.findOne({ where: { "id": req.query.id } })
      } else {
        return { 'msg': 'Este endereço não existe!' }
      }
    } catch (error) {
      return error
    }
  }

  static async delete(query){
    try {
      const address = await Address.findOne({ where: { "id": query.id } })
      if (address) {
        await Address.destroy({ where: { "id": query.id } })
        const deleteAddress = await Address.findOne({ where: { "id": query.id } })
        if (deleteAddress) {
          return { 'msg': 'Endereço não deletado!' }
        } else {
          return { 'msg': 'Endereço deletado!' }
        }
      } else {
        return { 'msg': 'Este Endereço não existe!' }
      }
    } catch (error) {
      return error
    }
  }

}




module.exports = AddressService