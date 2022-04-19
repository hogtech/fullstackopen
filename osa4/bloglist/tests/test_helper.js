const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'First blog',
    author: 'Hans Hokka',
    url: 'www.google.fi',
    likes: 1
  },
  {
    title: 'Second blog',
    author: 'Hans Hokka',
    url: 'www.fi',
    likes: 10
  },
  {
    title: 'Third blog',
    author: 'Hans Hokka',
    url: 'www.aalto.fi',
    likes: 15
  }

]

const nonExistingId = async () => {
  const note = new User({ content: 'willremovethissoon', date: new Date() })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}