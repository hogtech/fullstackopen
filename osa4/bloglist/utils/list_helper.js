var _ = require('lodash')

const dummy = (blogs) => {
  blogs = 1
  return blogs
}

const totalLikes = (blogs) => {
  //console.log('blogs.length: ', blogs.length)
  if (blogs.length === 0){
    return 0
  }else if (blogs.length === undefined){
    //console.log('undefined')
    return blogs[0].likes
  }else{
    const sum = blogs.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.likes
    }, 0)
    return sum
  }
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0){
    return 0
  }
  const max = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)

  const index = blogs.findIndex(object => {
    return object.likes === max.likes
  })
  return {
    title: blogs[index].title,
    author: blogs[index].author,
    likes: blogs[index].likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0){
    return 0
  }else if (blogs.length === 1){
    return {
      author: blogs[0].author,
      blogs: 1
    }
  }
  const blogsPerAuthor = blogs.reduce((object, blog) => {
    object[blog.author] = object[blog.author] ? object[blog.author] + 1 : 1

    return object
  }, {})
  let midResult = 0
  let authorWithMostBlogs = null
  let mostBlogsNumber = 0
  Object.entries(blogsPerAuthor).forEach(entry => {
    const [a, c] = entry
    if (c > midResult){
      authorWithMostBlogs = a
      mostBlogsNumber = c
      midResult = c
    }
  })
  return {
    author: authorWithMostBlogs,
    blogs: mostBlogsNumber
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0){
    return 0
  }else if (blogs.length === 1){
    return {
      author: blogs[0].author,
      likes: blogs[0].likes
    }
  }
  var counts = _(blogs)
    .groupBy('author')
    .map((g, key) => {
      return {
        author: key,
        likes: _.sumBy(g, 'likes')
      }})
    .values()
    .orderBy('likes', 'desc')
    .value()
  counts = _(counts).maxBy('likes')
  let authorWithMostLikes = counts.author
  let mostLikesNumber = counts.likes
  //console.log('counts: ', counts)
  //console.log('Author with most likes: ', authorWithMostLikes)
  //console.log('Most likes number: ', mostLikesNumber)
  return {
    author: authorWithMostLikes,
    likes: mostLikesNumber
  }
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}