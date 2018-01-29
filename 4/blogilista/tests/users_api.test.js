const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

const User= require('../models/user')
const {findAllUsers} = require('./test_helper')

describe('Käyttäjänluontitestit', () => {
  const firstUser = {
    username: 'admin',
    name: 'admin',
    password: 'password',
    adult: true
  }

  beforeAll(async () => {
    await User.remove({})

    await new User(firstUser).save()
  })

  test('ei alle 3 pituisia käyttäjänimiä', async () => {
    const wrong = {
      username: 'asd',
      name: 'admin',
      password: 'pa',
      adult: true
    }

    const before = await findAllUsers()

    const answer = await api.post('/api/users').send(wrong).expect(400)

    const after = await findAllUsers()

    expect(answer.body.error).toBe('salasana liian lyhyt')
    expect(after.length).toBe(before.length)
  })

  test('ei duplikaatteja', async () => {
    const wrong = {
      username: 'admin',
      name: 'admin',
      password: 'password',
      adult: true
    }

    const before = await findAllUsers()

    const answer = await api.post('/api/users').send(wrong).expect(400)

    const after = await findAllUsers()

    expect(answer.body.error).toBe('käyttäjänimi jo olemassa')
    expect(after.length).toBe(before.length)
  })

  test('aikuisuuden vakioarvo', async () => {
    const noAdult = {
      username: 'admi',
      name: 'admin',
      password: 'password'
    }

    const answer = await api.post('/api/users').send(noAdult)

    expect(answer.body.adult).toBe(true)
  })

  afterAll(() => {
    server.close()
  })
})