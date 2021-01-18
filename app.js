const express = require('express')
const cors = require('cors')
const app = express()
const productsRouter = require('./controllers/products')
const availabilityRouter = require("./controllers/availability");

app.use(cors())
app.use(express.json())

app.use('/api/products', productsRouter)
app.use('/api/availability', availabilityRouter)

module.exports = app