const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

class AppController{
  constructor(){
    this.express = express()
    this.routesPath = require('./routes/controllers')
    this.middlewares()
    this.routes()
    this.cors()
    this.parser()
  }
  middlewares(){
    this.express.use(express.json())
  }
  routes(){
    this.express.use('/api',this.routesPath)
  }

  cors(){
    this.express.use(cors())
  }
  
  parser(){
    this.express.use(bodyParser.urlencoded({ extended: true }));
  }
  
}

module.exports = new AppController().express
