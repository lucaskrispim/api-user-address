
const User = require('../../src/models/user')
const Address = require('../../src/models/address')
const Sequelize = require('sequelize')
const request = require('supertest')
const truncate = require('../utils/truncate')
const express = require('express')
const routesPath = require('../../src/routes/controllers')

const app = express().use(express.json()).use('/api', routesPath)

beforeAll(async () => {
  const dbConfig = require('../../src/config/database');
  const connection = new Sequelize(dbConfig);

  Address.init(connection);
  User.init(connection);
  Address.associate(connection.models);
  User.associate(connection.models);

  try {
    await connection.authenticate();
    console.log('Database connection has been established successfully.')
  } catch (err) {

    console.log(`Unable to connect to the database: ${err}`)
  }
});

describe('Test user endpoints', () => {

  beforeEach(async () => {
    await truncate()
  })

  it('should verify if api is work', async () => {

    const response = await request(app).get('/api/status')

    expect(response.status).toBe(200)
  })


  it('should create user with valid credentials', async () => {

    const response = await request(app).post('/api/user/create').send({
      name: "Lucas Crispim",
      email: "lucaskrispim@hotmail.com",
      phone_number: "32988818151",
      password: "Crispim1986"
    })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe("Lucas Crispim")
    expect(response.body.email).toBe("lucaskrispim@hotmail.com")
    expect(response.body.phone_number).toBe("32988818151")
  })

  it('should not create user with invalid credentials', async () => {

    const response = await request(app).post('/api/user/create').send({
      name: "",
      email: "lucaskrispim@hotmail.com",
      phone_number: "32988818151",
      password: "Crispim1986"
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("errors")
  })

  it('should login user with valid credentials', async () => {

    const response = await request(app).post('/api/user/create').send({
      name: "Lucas Crispim",
      email: "lucaskrispim@hotmail.com",
      phone_number: "32988818151",
      password: "Crispim1986"
    })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe("Lucas Crispim")
    expect(response.body.email).toBe("lucaskrispim@hotmail.com")
    expect(response.body.phone_number).toBe("32988818151")

    const login = await request(app).get('/api/user/login').send({
      name: "Lucas Crispim",
      password: "Crispim1986"
    })

    expect(login.status).toBe(200)
    expect(login.body).toHaveProperty("token")

  })

  it('should not login user with invalid credentials', async () => {

    const response = await request(app).post('/api/user/create').send({
      name: "Lucas Crispim",
      email: "lucaskrispim@hotmail.com",
      phone_number: "32988818151",
      password: "Crispim1986"
    })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe("Lucas Crispim")
    expect(response.body.email).toBe("lucaskrispim@hotmail.com")
    expect(response.body.phone_number).toBe("32988818151")

    const login = await request(app).get('/api/user/login').send({
      name: "Luca Crispim",
      password: "Crispim1986"
    })

    expect(login.status).toBe(200)
    expect(login.hasOwnProperty('token')).toBe(false)

  })


  it('should get all users', async () => {

    const lucas = await request(app).post('/api/user/create').send({
      name: "Lucas Crispim",
      email: "lucaskrispim@hotmail.com",
      phone_number: "32988818151",
      password: "Crispim1986"
    })

    expect(lucas.status).toBe(200)
    expect(lucas.body.name).toBe("Lucas Crispim")
    expect(lucas.body.email).toBe("lucaskrispim@hotmail.com")
    expect(lucas.body.phone_number).toBe("32988818151")

    const dani = await request(app).post('/api/user/create').send({
      name: "Danielle Tirapani",
      email: "danielletirapani@hotmail.com",
      phone_number: "32988818151",
      password: "Crispim1986"
    })

    expect(dani.status).toBe(200)
    expect(dani.body.name).toBe("Danielle Tirapani")
    expect(dani.body.email).toBe("danielletirapani@hotmail.com")
    expect(dani.body.phone_number).toBe("32988818151")

    const login = await request(app).get('/api/user/login').send({
      name: "Lucas Crispim",
      password: "Crispim1986"
    })

    expect(login.status).toBe(200)
    expect(login.body).toHaveProperty("token")


    const getAll = await request(app).get('/api/user/').set(
      login.body
    )

    expect(getAll.status).toBe(200)
    expect(getAll.body).toHaveLength(2)

  })


  it('should modify user with valid credentials', async () => {

    const response = await request(app).post('/api/user/create').send({
      name: "Lucas Crispim",
      email: "lucaskrispim@hotmail.com",
      phone_number: "32988818151",
      password: "Crispim1986"
    })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe("Lucas Crispim")
    expect(response.body.email).toBe("lucaskrispim@hotmail.com")
    expect(response.body.phone_number).toBe("32988818151")


    const login = await request(app).get('/api/user/login').send({
      name: "Lucas Crispim",
      password: "Crispim1986"
    })

    expect(login.status).toBe(200)
    expect(login.body).toHaveProperty("token")

    const modifyLucas = await request(app).put('/api/user/modify').set(
      login.body
    ).send({
      name: "Luca Crispim",
      email: "lucaskrispim@hotmail.com",
      phone_number: "32988818151",
      password: "Crispim1986"
    })

    expect(modifyLucas.status).toBe(200)
    expect(modifyLucas.body.name).toBe("Luca Crispim")

  })

  it('should not modify user with invalid credentials', async () => {

    const response = await request(app).post('/api/user/create').send({
      name: "Lucas Crispim",
      email: "lucaskrispim@hotmail.com",
      phone_number: "32988818151",
      password: "Crispim1986"
    })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe("Lucas Crispim")
    expect(response.body.email).toBe("lucaskrispim@hotmail.com")
    expect(response.body.phone_number).toBe("32988818151")


    const login = await request(app).get('/api/user/login').send({
      name: "Lucas Crispim",
      password: "Crispim1986"
    })

    expect(login.status).toBe(200)
    expect(login.body).toHaveProperty("token")

    const modifyLucas = await request(app).put('/api/user/modify').set(
      login.body
    ).send({
      name: " ",
      email: "lucaskrispim@hotmail.com",
      phone_number: "32988818151",
      password: "Crispim1986"
    })

    expect(modifyLucas.status).toBe(400)
    expect(modifyLucas.body.hasOwnProperty('name')).toBe(false)

  })


  it('should delete user with valid credentials', async () => {

    const response = await request(app).post('/api/user/create').send({
      name: "Lucas Crispim",
      email: "lucaskrispim@hotmail.com",
      phone_number: "32988818151",
      password: "Crispim1986"
    })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe("Lucas Crispim")
    expect(response.body.email).toBe("lucaskrispim@hotmail.com")
    expect(response.body.phone_number).toBe("32988818151")


    const login = await request(app).get('/api/user/login').send({
      name: "Lucas Crispim",
      password: "Crispim1986"
    })

    expect(login.status).toBe(200)
    expect(login.body).toHaveProperty("token")

    const deleteLucas = await request(app).delete('/api/user/delete').set(
      login.body
    ).send({
      id: response.body.id
    })

    expect(deleteLucas.status).toBe(200)
    expect(deleteLucas.body.hasOwnProperty('msg')).toBe(true)

  })

  it('should not delete user with invalid credentials', async () => {

    const response = await request(app).post('/api/user/create').send({
      name: "Lucas Crispim",
      email: "lucaskrispim@hotmail.com",
      phone_number: "32988818151",
      password: "Crispim1986"
    })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe("Lucas Crispim")
    expect(response.body.email).toBe("lucaskrispim@hotmail.com")
    expect(response.body.phone_number).toBe("32988818151")


    const login = await request(app).get('/api/user/login').send({
      name: "Lucas Crispim",
      password: "Crispim1986"
    })

    expect(login.status).toBe(200)
    expect(login.body).toHaveProperty("token")

    const deleteLucas = await request(app).delete('/api/user/delete').set(
      login.body
    ).send({
      id: 'lucas'
    })

    expect(deleteLucas.status).toBe(200)
    expect(deleteLucas.body.hasOwnProperty('msg')).toBe(true)
    expect(deleteLucas.body.msg).toBe("Este usuário não existe!")

    const login2 = await request(app).get('/api/user/login').send({
      name: "Lucas Crispim",
      password: "Crispim1986"
    })

    expect(login2.status).toBe(200)
    expect(login2.body).toHaveProperty("token")

  })

})

describe('Test address endpoints', () => {

  beforeEach(async () => {
    await truncate()
  })

  it('should create address with valid credentials', async () => {

    const response = await request(app).post('/api/user/create').send({
      name: "Lucas Crispim",
      email: "lucaskrispim@hotmail.com",
      phone_number: "32988818151",
      password: "Crispim1986"
    })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe("Lucas Crispim")
    expect(response.body.email).toBe("lucaskrispim@hotmail.com")
    expect(response.body.phone_number).toBe("32988818151")

    const login = await request(app).get('/api/user/login').send({
      name: "Lucas Crispim",
      password: "Crispim1986"
    })

    expect(login.status).toBe(200)
    expect(login.body).toHaveProperty("token")

    const address = await request(app).post('/api/address/create').set(login.body).send({
      street: "rua jesus de oliveira",
      number: 56,
      zip_code: "36060-220",
    })

    expect(address.status).toBe(200)
    expect(address.body.street).toBe("rua jesus de oliveira")
    expect(address.body.number).toBe(56)
    expect(address.body.zip_code).toBe("36060-220")

  })



})

