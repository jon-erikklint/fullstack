const blogsRouter = require('express').Router()

const jsonwebtoken = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, _id: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  try {
    const userToken = jsonwebtoken.verify(request.token, process.env.SECRET)

    if(!userToken || !userToken.userId) return response.sendStatus(403)

    let user = await User.findById(userToken.userId)

    let body = request.body
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    if(!blog.title || !blog.url ) return response.sendStatus(400).end()

    const newblog = await blog.save()

    user.blogs = user.blogs.concat(newblog._id)
    await user.save()

    response.status(201).json(newblog)
  }catch(exception){
    if (exception.name === 'JsonWebTokenError' ) {
      return response.status(401).json({ error: exception.message })
    }

    console.log(exception)
    response.status(500).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    let id = request.params.id

    const token = jsonwebtoken.verify(request.token, process.env.SECRET)

    if(!token || !token.userId) return response.status(401).send({ error: 'invalid token' })

    const user = await User.findById(token.userId)
    const blog = await Blog.findById(id)

    if(user._id.toString() === blog.user.toString()) {
      await Blog.findByIdAndRemove(id)
      response.sendStatus(204)
    } else {
      response.sendStatus(403)
    }
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      return response.status(401).json({ error: exception.message })
    }

    console.log(exception)
    return response.sendStatus(500)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  let id = request.params.id
  let body = request.body

  try {
    const found = await Blog.findByIdAndUpdate(id, {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }, { new: true })

    response.json(found)
  } catch (error) {
    console.log(error)
    response.sendStatus(404).end()
  }
})

module.exports = blogsRouter