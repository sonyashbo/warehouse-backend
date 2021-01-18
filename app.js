const express = require('express')
const cors = require('cors')
const app = express()
const middleware = require('./utils/middleware')
const productsRouter = require('./controllers/products')
const availabilityRouter = require("./controllers/availability")
const path = require("path");

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/products', productsRouter)
app.use('/api/availability', availabilityRouter)

app.get('/*', (req, res) => {
    let url = path.join(__dirname, 'build', 'index.html')
    res.sendFile(url)
});

//app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app