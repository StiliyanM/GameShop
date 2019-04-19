const cors = require('cors')
const bodyParser = require('body-parser')
const userRoutes = require('../routes/user')
const gameRoutes = require('../routes/game')
const orderRoutes = require('../routes/order')

module.exports = app => {
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(bodyParser.json())
  app.use(cors({
    origin: 'http://localhost:4200'
  }))

  app.use('/user', userRoutes)
  app.use('/games', gameRoutes)
  app.use('/order', orderRoutes)

}