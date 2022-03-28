//const blog = require('../models/blog')

const dummy = (blogs) => {
  blogs = 1
  return blogs
}

/* const totalLikes = blogs => {
  if (!blogs){
    return 0
  }
  if (blogs.length === 1) {
    return blogs[0].likes
  }
  const reducer = (sum, item) => {
    return sum + item
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0) / blogs.length
} */
//let total = 0
const totalLikes = (blogs) => {
  return 0
}
module.exports = {
  dummy,
  totalLikes
}