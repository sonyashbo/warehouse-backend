const express = require('express')
const cors = require('cors')
const app = express()
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const productsRouter = require('./controllers/products')
const availabilityRouter = require("./controllers/availability");

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/products', productsRouter)
app.use('/api/availability', availabilityRouter)

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports = app