const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

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

beforeAll(async () => {
  await Blog.remove({})

  const promiseArray = initialBlogs.map(blog => new Blog(blog).save())
  await Promise.all(promiseArray)
})

test('Kaikkien haku toimii', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Kaikkien haku antaa sopivasti', async () => {
  const blogs = await api.get('/api/blogs')

  expect(blogs.body.length).toBe(initialBlogs.length)
})

test('Kaikkien haku sisältää halutut', async () => {
  const blogs = await api.get('/api/blogs')

  let blogHelps = blogs.body.map(blog => blog.title)

  expect(blogHelps).toContainEqual(initialBlogs[0].title)
  expect(blogHelps).toContainEqual(initialBlogs[1].title)
})

const newBlog = {
  title: "Uusi",
  author: "Blogaaja",
  url: "blogi.com",
  likes: 1
}

test('Lisäys palauttaa uuden', async () => {
  const result = await api.post('/api/blogs').send(newBlog).expect(201)
})

test('Lisäyksen yhteydessä uusi löytyy kaikista', async () => {
  const result = await api.get('/api/blogs')

  expect(result.body.length).toBe(initialBlogs.length + 1)
  
  const blogHelps = result.body.map(blog => ({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }))

  expect(blogHelps).toContainEqual(newBlog)
})

const noLikesBlog = {
  title: "Uusi2",
  author: "Blogaajaa",
  url: "blogi2.com"
}

test('Jos lisätyllä ei likes-arvoa, sille asetetaan 0', async () => {
  const result = await api.post('/api/blogs').send(noLikesBlog)

  expect(result.body.likes).toBe(0)
})

const noTitleBlog = {
  author: "Blogaajaa",
  url: "blogi2.com",
  likes: 1
}

const noUrlBlog = {
  title: "Uusi2",
  author: "Blogaajaa",
  likes: 1
}

test('Jos blogilla ei nimeä tai urlia, tulee 400', async () => {
  const noTitleResult = await api.post('/api/blogs').send(noTitleBlog)
  const noUrlResult = await api.post('/api/blogs').send(noUrlBlog)
  
  expect(noTitleResult.status).toBe(400)
  expect(noUrlResult.status).toBe(400)
})

afterAll(() => {
  server.close()
})