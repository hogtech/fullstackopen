import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}
const vote = async (id) => {
    console.log('anecdotes.js/vote, id: ', id)
    const response = await axios.get(baseUrl)
    const anecdoteToChange = response.data.find(n => n.id === id)
    const content = anecdoteToChange.content
    const votes = anecdoteToChange.votes + 1
    const object = { content: content, votes: votes }
    console.log('anecdotes/vote, anecdoteToChange: ', anecdoteToChange)
    console.log('anecdotes.js/vote, response.data: ', response.data)
    console.log('anecdotes.js/vote, find: ', response.data.find(n => n.id === id))
    let url = baseUrl + "/" + id
    const responseFromPut = await axios.put(url, object)
    console.log('responseFromPut: ', responseFromPut)
    return responseFromPut
}
export default { getAll, createNew, vote }