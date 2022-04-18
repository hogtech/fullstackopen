const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')


/* beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})
 */

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are three blogs', async () => {
  const response = await api.get('/api/blogs')
  //console.log('response body length: ', response.body.length)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the name of the id is id instead of _id', async () => {
  const response = await api.get('/api/blogs')
  //console.log('response body [0].id', response.body[0].id)
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'First blog',
    author: 'Hans Hokka',
    url: 'www.google.fi',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const title = blogsAtEnd.map(n => n.title)
  expect(title).toContain(
    'First blog'
  )
})

test('blog without likes is given 0 for likes', async () => {
  const newBlog = {
    title: 'Fourth blog',
    author: 'Hans Hokka',
    url: 'www.nelonen.fi'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  console.log('blogsAtEnd: ', blogsAtEnd)
  //expect(blogsAtEnd[3].likes).toBeDefined()
  expect(blogsAtEnd[3].likes).toEqual(0)


})

test('blog without title and url is not added', async () => {
  const newBlog = {
    author: 'Hans Hokka',
    likes: 40
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const contents = blogsAtEnd.map(r => r.id)
  console.log('contents: ', contents)
  console.log('blogs at end: ', blogsAtEnd)
  expect(contents).not.toContain(blogToDelete.id)
})

test('adding a blog without title triggers 400 Bad Request', async () => {
  const newBlog = {
    author: 'Hans Hokka',
    url: 'www.google.fi',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})
test('adding a blog without url triggers 400 Bad Request', async () => {
  const newBlog = {
    title: 'Some title',
    author: 'Hans Hokka',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('adding a blog without url and title triggers 400 Bad Request', async () => {
  const newBlog = {
    author: 'Hans Hokka',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})


afterAll(() => {
  mongoose.connection.close()
})