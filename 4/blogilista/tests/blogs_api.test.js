const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

const Blog = require('../models/blog')
const {findAllBlogs, parseBlog, initialBlogs} = require('./test_helper')

describe('blog-api tests', () => {
  beforeAll(async () => {
    await Blog.remove({})

    await Promise.all(initialBlogs.map(blog => new Blog(blog).save()))
  })

  test('Kaikkien haku toimii', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Kaikkien haku antaa sopivasti', async () => {
    const blogsInDb = await findAllBlogs()

    const blogs = await api.get('/api/blogs')

    expect(blogs.body.length).toBe(blogsInDb.length)
  })

  test('Kaikkien haku sisältää halutut', async () => {
    const blogsInDb = await findAllBlogs()

    const blogs = await api.get('/api/blogs')

    let blogHelps = blogs.body.map(parseBlog)

    expect(blogHelps).toContainEqual(blogsInDb[0])
  })

  describe('Lisäys', () => {
    const newBlog = {
      title: "Uusi",
      author: "Blogaaja",
      url: "blogi.com",
      likes: 1
    }
  
    test('Lisäys palauttaa uuden', async () => {
      const result = await api.post('/api/blogs').send(newBlog).expect(201)

      expect(parseBlog(result.body)).toEqual(newBlog)
    })

    const newBlog2 = {
      title: "Uussi",
      author: "Blogaaja",
      url: "blogi.com",
      likes: 1
    }
  
    test('Lisäyksen yhteydessä uusi löytyy kaikista', async () => {
      const inDb = await findAllBlogs()

      const result = await api.post('/api/blogs').send(newBlog2)

      const newInDb = await findAllBlogs()
  
      expect(inDb.length + 1).toBe(newInDb.length)
  
      expect(newInDb).toContainEqual(newBlog2)
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
  })

  describe('Poisto', () => {
    const removeBlog = {
      title: "asd",
      author: "Blogaajaa",
      url: "blogi2.com",
      likes: 1
    }

    let addedId

    beforeAll(async () => {
      const added = await api.post('/api/blogs').send(removeBlog)
      addedId = added.body._id
    })

    test('Poisto poistaa', async () => {
      const beforeInDb = await findAllBlogs()

      await api.delete('/api/blogs/'+addedId).expect(204)

      const afterInDb = await findAllBlogs()

      expect(afterInDb.length).toBe(beforeInDb.length - 1)
      expect(afterInDb).not.toContainEqual(removeBlog)
    })
  })

  afterAll(() => {
    server.close()
  })
})