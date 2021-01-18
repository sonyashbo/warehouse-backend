const availabilityRouter = require('express').Router()
const axios = require('axios')
const convert = require('xml-js');
const baseUrl = 'https://bad-api-assignment.reaktor.com/v2/availability'
const cache = require('../cache')

availabilityRouter.get('/:manufacturer/:id', async (request, response, next) => {
    const manufacturer = request.params.manufacturer
    const productId = request.params.id

    let cachedData = cache.get(manufacturer)
    if (!cachedData) {
        const availability = await axios.get(`${baseUrl}/${manufacturer}`)
        const data = availability.data.response
        let itemsToCache = {};
        for (let i = 0; i < data.length; i++) {
            const xml=data[i]
            const availability = getAvailability(xml)
            itemsToCache[xml.id] = availability
        }

        cache.set(manufacturer, itemsToCache);
    }
    cachedData = cache.get(manufacturer)
    const productAvailability = cachedData[productId.toUpperCase()]
    response.json({
        id: productId,
        availability: productAvailability
    })

})

const getAvailability = (xml) => {
    const payload = convert.xml2json(xml.DATAPAYLOAD, {compact: true, spaces: 4});
    const jsonPayload = JSON.parse(payload)
    return jsonPayload.AVAILABILITY.INSTOCKVALUE._text
}

module.exports = availabilityRouter