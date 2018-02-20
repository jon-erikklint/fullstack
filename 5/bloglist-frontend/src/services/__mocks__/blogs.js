const blogMocks = [
  {
    title: "Test1",
    author: "Test writer",
    url: "test.com",
    likes: 1,
    _id: "äafäak2ä24o"
  },
  {
    title: "Test2",
    author: "Test writer2",
    url: "test2.com",
    likes: 2,
    id: "2423402348923"
  },
]

const getAll = () => {
  return Promise.resolve(blogMocks);
}

const setToken = (token) => {

}

export default {getAll, setToken, blogs: blogMocks}