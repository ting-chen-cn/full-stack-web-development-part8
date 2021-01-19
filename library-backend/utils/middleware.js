const logger = require('./logger')

const requestLogger = (request, require, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  // console.log('TOKEN')
  // console.log(authorization.substring(7))
  if (
    authorization &&
    authorization.toLowerCase().startsWith('bearer ')
  ) {
    // console.log('YESSSS')
    request.token = authorization.substring(7)
    // console.log(request.token)
  } else {
    request.token = null
    // console.log('NOOOOOO')
  }

  // console.log(request.token)
  // console.log('YESSSS')
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
}
