import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = person => axios.post(baseUrl, person).then(response => response.data)

const update = (person, id) => axios.put(baseUrl+'/'+id, person).then(response => response.data)

const remove = id => axios.delete(baseUrl+'/'+id)

export default {getAll, create, remove, update}