const Blog = require('../models/blog')

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

parse = blog => ({
  title: blog.title,
  author: blog.author,
  url: blog.url,
  likes: blog.likes
})

findAll = async () => {
  let blogs = await Blog.find({})
  return blogs.map(parse)
}

module.exports = {
  initialBlogs, parse, findAll
}