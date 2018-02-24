const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({}).populate('blogs', { author: 1, url: 1, likes: 1, _id: 1, title: 1 })
    response.json(users.map(User.format))
  } catch(error) {
    console.log(error)
    response.sendStatus(500).end()
  }
})

usersRouter.post('/', async (request, response) => {
  let body = request.body

  const saltRounds = 10

  try {
    if(body.password.length < 3) {
      return response.status(400).json({ error: 'salasana liian lyhyt' })
    }

    const existingUser = await User.find({ username: body.username })
    if(existingUser.length > 0) {
      return response.status(400).json({ error: 'käyttäjänimi jo olemassa' })
    }

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash: await bcrypt.hash(body.password, saltRounds),
      adult: body.adult == null ? true : body.adult
    })

    const result = await user.save()
    response.status(201).json(User.format(result))
  } catch(error) {
    console.log(error)
    response.sendStatus(500).end()
  }
})

module.exports = usersRouter