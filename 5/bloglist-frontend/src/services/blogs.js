import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = tokenText => {
  token = 'bearer ' + tokenText
}

const create = blog => {
  const config = {
    headers: {'Authorization': token}
  }

  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

export default { setToken, getAll, create }