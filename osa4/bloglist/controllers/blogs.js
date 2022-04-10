const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  //console.log('response[0].body.title: ', response[0].body.title)
  if (blog.likes === undefined){
    blog.likes = 0
  }
  //console.log('blog.likes: ', blog.likes)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter