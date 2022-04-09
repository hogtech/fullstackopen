const Blog = require('../models/blog')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


module.exports = {
  initialBlogs,
  blogsInDb
}