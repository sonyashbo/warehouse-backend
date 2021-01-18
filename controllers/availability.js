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
        const data = await getManufacturerAvailability(manufacturer)
        const itemsToCache = {};
        for (let i = 0; i < data.length; i++) {
            const xml = data[i]
            const availability = getItemAvailability(xml)
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

const getItemAvailability = (xml) => {
    const payload = convert.xml2json(xml.DATAPAYLOAD, {compact: true, spaces: 4});
    const jsonPayload = JSON.parse(payload)
    return jsonPayload.AVAILABILITY.INSTOCKVALUE._text
}

//workaround for build-in API bug
const getManufacturerAvailability = async (manufacturer) => {
    let availability = ""
    while (!Array.isArray(availability)) {
        const result = await axios.get(`${baseUrl}/${manufacturer}`)
        availability = result.data.response
    }
    return availability
}

module.exports = availabilityRouter