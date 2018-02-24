const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const user = await User.findOne( { username: body.username } )

    if(!user || !(await bcrypt.compare(body.password, user.passwordHash))) {
      return response.status(401).send({ error: 'invalid username or password' })
    }

    const tokenInfo = {
      userId: user._id,
      username: user.username
    }

    const token = jsonwebtoken.sign(tokenInfo, process.env.SECRET)

    response.status(200).send({ token, username: body.username, name: body.name })
  } catch(error) {
    console.log(error)
    response.sendStatus(500)
  }
})

module.exports = loginRouter