//const blog = require('../models/blog')

const dummy = (blogs) => {
  blogs = 1
  return blogs
}

const totalLikes = (blogs) => {
  if (blogs.length === 0){
    return 0
  }else if (blogs.length === undefined){
    return 7
  }else{
    const sum = blogs.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.likes
    }, 0)
    return sum
  }
}
module.exports = {
  dummy,
  totalLikes
}