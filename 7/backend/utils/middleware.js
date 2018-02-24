const getAuthorizationToken = (request, response, next) => {
  const authorization = request.get('authorization')

  let token = null
  if(authorization && authorization.substring(0, 6).toLowerCase() === 'bearer' ) {
    token = authorization.substring(7)
  }

  request.token = token
  next()
}

module.exports = getAuthorizationToken