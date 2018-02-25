import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = tokenText => {
  token = tokenText ? 'bearer ' + tokenText : null
}
const getToken = () => {
  return token ? {headers: { 'Authorization': token }} : null
}

const getAll = () => {
  return get(baseUrl)
}

const get = (url, item, config) => {
  return request('get', url, item, config)
}

const request = (type, url, item = {}, config = {}) => {
  const request = axios[type](url, item, config)
  return request.then(response => response.data)
}

export default {setToken, getAll, getToken}