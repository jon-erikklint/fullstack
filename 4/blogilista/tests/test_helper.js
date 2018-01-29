const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "Testiblogi1",
    author: "Testimiäs",
    url: "testiblogi.com",
    likes: 1
  },
  {
    title: "Testiblogi2",
    author: "Testimiäs",
    url: "testiblogi2.com",
    likes: 4
  }
]

parseBlog = blog => ({
  title: blog.title,
  author: blog.author,
  url: blog.url,
  likes: blog.likes
})

findAllBlogs = async () => {
  let blogs = await Blog.find({})
  return blogs.map(parseBlog)
}

findAllUsers = async () => {
  let users = await User.find({})
  return users.map(User.format)
}

module.exports = {
  initialBlogs, parseBlog, findAllBlogs, findAllUsers
}