const express = require('express')
const cors = require('cors')
const app = express()
const middleware = require('./utils/middleware')
const productsRouter = require('./controllers/products')
const availabilityRouter = require("./controllers/availability")

app.use(cors())

//for development testing comment the line below and delete build folder from root directory
app.use(express.static('build'))

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/products', productsRouter)
app.use('/api/availability', availabilityRouter)

//for development testing comment the line below and delete build folder from root directory
app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports = app