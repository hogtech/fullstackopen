import axios from 'axios'
const baseUrl = '/api/blogs'

/* eslint-disable */
let token = null
/* eslint-enable */
const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, setToken }