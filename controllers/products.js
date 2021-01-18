const productRouter = require('express').Router()
const axios = require('axios')
const baseUrl = 'https://bad-api-assignment.reaktor.com/v2/products'

productRouter.get('/:type', async (request, response, next) => {
    const type = request.params.type
    const products = await axios.get(`${baseUrl}/${type}`)
    response.json(products.data.slice(0,50))
})

module.exports = productRouter