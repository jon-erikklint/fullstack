const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  let body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  if(!blog.title || !blog.url ) return response.sendStatus(400).end()

  try {
    const result = await blog.save()
    response.status(201).json(result)
  }catch(exception){
    response.status(400).end()
  }
})

module.exports = blogsRouter