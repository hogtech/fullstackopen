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
  if (blogs.length === 0){
    return 0
  }else if (blogs.length === undefined){
    return 7
  }else{
    /* let sum = 0
    for (let i = 0; i < blogs.length; i++){
      sum += blogs[i].likes
    }
    return sum */
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