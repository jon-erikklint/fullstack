import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = tokenText => {
  token = 'bearer ' + tokenText
}
const getToken = () => {
  return {headers: { 'Authorization': token }}
}

const getAll = () => {
  return get(baseUrl)
}
const create = blog => {
  return post(baseUrl, blog, getToken())
}
const update = blog => {
  return put(baseUrl + '/' + blog._id, blog, getToken())
}
const deleteBlog = blog => {
  return deleteOne(baseUrl + '/' + blog._id, getToken())
}

const request = (type, url, item = {}, config = {}) => {
  const request = axios[type](url, item, config)
  return request.then(response => response.data)
}
const get = (url, item, config) => {
  return request('get', url, item, config)
}
const post = (url, item, config) => {
  return request('post', url, item, config)
}
const put = (url, item, config) => {
  return request('put', url, item, config)
}
const deleteOne = (url, config) => {
  return axios.delete(url, config).then(response => response.data)
}

export default { setToken, getAll, create, update, delete: deleteBlog }