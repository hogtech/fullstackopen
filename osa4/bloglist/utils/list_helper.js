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
  }else if (blogs.length === undefined){
    console.log('undefined')
    return blogs[0]
  }
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
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}