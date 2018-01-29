const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, _id: 1, name: 1})

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  try {
    let users = await User.find({})

    let body = request.body
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: users[0]._id
    })

    if(!blog.title || !blog.url ) return response.sendStatus(400).end()

    const result = await blog.save()

    users[0].blogs = users[0].blogs.concat(result._id)
    console.log(users[0])
    await users[0].save()

    response.status(201).json(result)
  }catch(exception){
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  let id = request.params.id

  try {
    const result = await Blog.findByIdAndRemove(id)
  } catch (error) {}

  response.sendStatus(204).end()
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
    }, {new: true})

    response.json(found)
  } catch (error) {
    console.log(error)
    response.sendStatus(404).end()
  }
})

module.exports = blogsRouter