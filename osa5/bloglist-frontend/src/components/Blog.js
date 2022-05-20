import { useState } from 'react'
//import blogService from '../services/blogs'

const Blog = ({ blog, makeLikeCallback, removeCallback, user }) => {

  const [visible, setVisible] = useState(false)
  const [showRemove, setShowRemove] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const [blogs, setBlogs] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState(null)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  // const hideRemoveWhenVisible = { display: showRemove ? 'none' : '' }
  const showRemoveWhenVisible = { display: showRemove ? '' : 'none' }

  /* useEffect(() => {
    blogService
      .getAll()
      .then(initialNotes => {
        setBlogs(initialNotes)
      })
  }, [])
 */
  const toggleVisibility = () => {
    setVisible(!visible)
    // eslint-disable-next-line no-constant-condition
    console.log('toggleVisibility: blog.user.username: ', blog.user.username)
    console.log('toggleVisibility: user.username: ', user.username)
    if ((blog.user.username === user.username)) {
      setShowRemove(!showRemove)
    } else {
      setShowRemove(showRemove)
    }
  }

  const like = async (event) => {
    event.preventDefault()
    console.log('like added. event: ', event)
    //const blog1 = blogs.find(n => n.id === event.id)
    console.log('blog: ', blog)
    let likes = blog.likes + 1
    console.log('likes: ', likes)
    const changedBlog = {
      /* user: 'hhokka5', */
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      author: blog.author,
      user: blog.user.id
    }
    //const changedBlog = { ...blog }
    console.log('changedBlog: ', changedBlog)
    makeLikeCallback(blog.id, changedBlog)

    /* blogService
      .update(event.id, changedBlog) */
  }
  /*
  const addLike2 = () => {
    console.log('addLike2')
  } */

  const remove = async (event) => {
    event.preventDefault()
    console.log('remove clicked, blog.id: ', blog.id)
    removeCallback(blog.id)

  }

  return (
    <div className='blog'>
      <div style={hideWhenVisible}>
        {blog.title}&nbsp;
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title}&nbsp;<button onClick={toggleVisibility}>hide</button><br></br>
        {blog.url}<br></br>
        likes {blog.likes} <button onClick={like}>like</button><br></br>
        {blog.author}<br></br>
        <button style={showRemoveWhenVisible} onClick={remove}>remove</button>
      </div>
    </div>
  )
}

export default Blog