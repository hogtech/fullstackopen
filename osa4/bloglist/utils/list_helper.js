var _ = require('lodash')

const dummy = (blogs) => {
  blogs = 1
  return blogs
}

const totalLikes = (blogs) => {
  console.log('blogs.length: ', blogs.length)
  if (blogs.length === 0){
    return 0
  }else if (blogs.length === undefined){
    console.log('undefined')
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
  }/* else if (blogs.length === undefined){
    console.log('undefined')
    return blogs[0]
  } */
  const max = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)

  //const index = blogs.findIndex(max)
  const index = blogs.findIndex(object => {
    return object.likes === max.likes
  })
  //const index = blogs.map(e => e.likes).indexOf(max.likes)
  /* console.log('max: ', max)
  console.log('index: ', index) */
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
  //const max = blogs.reduce((prev, current) => (prev > current) ? prev : current)
  //const max = _.countBy(blogs)
  /* const maxObj = blogs.reduce((prev, current) => (prev > current) ? prev : current)
  const max = _.sumBy(blogs, i => (i.author === 'Edsger W. Dijkstra' ? 1 : 0))
  console.log('max: ', max)
  console.log('maxObj.author: ', maxObj.author)
 *//*
  const value = 'Edsger W. Dijkstra'
  const max = blogs.filter((obj) => obj.author === value).length
  console.log('max: ', max) */
  /*  const blogsPerAuthor = blogs.reduce((sums,entry) => {
    sums[entry.author] = (sums[entry.author] || 0) + 1
    return sums
  },{})
  const max = _.maxBy(blogsPerAuthor, 'blogs' )
  console.log('BlogsPerAuthor: ', blogsPerAuthor) */

  function mode(blogs){
    return blogs.sort((a,b) =>
      blogs.filter(v => v===a).length
      - blogs.filter(v => v===b).length
    ).pop()
  }



  const result = _.values(_.groupBy(blogs)).map(d => ({ name: d[0], count: d.length }))
  const nameOfTheAuthor = _.maxBy(blogs, 'author').author
  const numberOfBlogs = _.maxBy(blogs, 'author')
  console.log('nameOfTheAuthor: ', nameOfTheAuthor)
  console.log('numberOfBlogs: ', numberOfBlogs)
  console.log('result: ', result)
  console.log('mode: ', mode(blogs))
  return {
    author: nameOfTheAuthor,
    blogs: numberOfBlogs
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
  //const index = 0
  /* let max = _.maxBy(blogs, 'likes').author
  console.log('max: ', max) */
  return {
    author: _.maxBy(blogs, 'likes').author,
    likes: _.maxBy(blogs, 'likes').likes
  }
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}