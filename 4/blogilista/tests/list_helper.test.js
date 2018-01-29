const listHelper = require('../utils/list_helper')

test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const totalLikes = listHelper.totalLikes;

describe('total likes', () => {

  test('when list has only one blog equals the likes of that', () => {
    expect(totalLikes([blogs[0]])).toBe(7)
  })

  test('works with many blogs', () => {
    expect(totalLikes(blogs)).toBe(36)
  })

  test('works with no blogs', () => {
    expect(totalLikes([])).toBe(0)
  })
})

const mostLiked = listHelper.mostLiked;

describe('Most liked', () => {
  test('with one', () => {
    expect(mostLiked([blogs[0]])).toEqual(blogs[0]);
  })

  test('with many', () => {
    expect(mostLiked(blogs)).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    })
  })

  test('with none', () => {
    expect(mostLiked([])).toBe(null);
  })
})

const mostBlogs = listHelper.mostBlogs;

describe('most blogs', () => {
  test('with one', () => {
    expect(mostBlogs([blogs[0]])).toEqual({name: "Michael Chan", blogs: 1})
  })

  test('with many', () => {
    expect(mostBlogs(blogs)).toEqual({name: "Robert C. Martin", blogs: 3})
  })

  test('with none', () => {
    expect(mostBlogs([])).toEqual({blogs: 0})
  })
})

const mostLikes = listHelper.mostLikes;

describe('most likes', () => {
  test('with one', () => {
    expect(mostLikes([blogs[0]])).toEqual({name: "Michael Chan", likes: 7})
  })

  test('with many', () => {
    expect(mostLikes(blogs)).toEqual({name: "Edsger W. Dijkstra", likes: 17})
  })

  test('with none', () => {
    expect(mostLikes([])).toEqual({likes: 0})
  })
})