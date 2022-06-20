import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('response: ', newObject)
  console.log('token: ', token)
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const update = async(id, newObject) => {
  console.log('newObject: ', newObject)
  const res = await axios.put(`${baseUrl}/${id}`, newObject)
  return res.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

export default { getAll, setToken, create, update, remove }