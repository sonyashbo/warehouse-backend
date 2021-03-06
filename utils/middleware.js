const logger = require('./logger')
const path = require("path");

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    next(error)
}

const unknownEndpoint = (request, response) => {
    let url = path.join(__dirname, '../build', 'index.html')
    response.sendFile(url)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}