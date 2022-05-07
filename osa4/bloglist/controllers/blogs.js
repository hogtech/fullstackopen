const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
//const User = require('../models/user')
const jwt = require('jsonwebtoken')
/*
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
} */

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  //const token = request.token
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  ///const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  //const user = await User.findById(decodedToken.id)
  const user = request.user
  //const user = await User.findById(request.body.userId)
  //const user = await User.finssdOne().sort('-created_at')
  console.log('user: ', user)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if (blog.likes === undefined){
    blog.likes = 0
  }
  if (blog.title === undefined || blog.url === undefined){
    //const savedBlog = await blog.save()
    response.status(400).json(request.body)
  } else {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  /* //const token = request.token
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  ///const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  } */
  const blog = await Blog.findById(request.params.id)
  const userFromBlog = blog.user
  //const userFromToken = decodedToken.id
  const userFromToken = request.user.id
  console.log('request.params.id: ', request.params.id)
  console.log('userFromBlog: ', userFromBlog.toString())
  console.log('userFromToken: ', userFromToken)
  console.log('request.user.id: ', request.user.id)
  //console.log('decoded token: ', decodedToken)

  //const userid = request.user.id
  if (userFromBlog.toString() === userFromToken.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    console.log('found: ', request.params.id)
    response.status(204).end()
  } else {
    console.log('not found: ', request.params.id)
    response.status(401).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  console.log('put: ', blog)
  console.log('request.params: ', request.params)
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})
module.exports = blogsRouter