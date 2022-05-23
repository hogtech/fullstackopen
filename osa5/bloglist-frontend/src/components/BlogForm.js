import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleLikesChange = (event) => {
    setLikes(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: likes
    }
    console.log('BlogForm/addBlog: ', blogObject)

    createBlog(blogObject)
    //window.location.reload(false)
  }


  return(
    <div>
      <h1>create new</h1>
      <form onSubmit={addBlog}>
        <label htmlFor="title">title</label>
        <input
          id="title"
          name="title"
          value={title}
          //value="hans"
          onChange={handleTitleChange}
        /><br></br>
        <label htmlFor="author">author</label>
        <input
          id="author"
          name="author"
          value={author}
          onChange={handleAuthorChange}
        /><br></br>
        <label htmlFor='url'>url</label>
        <input
          id="url"
          name="url"
          value={url}
          onChange={handleUrlChange}
        /><br></br>
        <label htmlFor='url'>likes</label>
        <input
          id="likes"
          name="likes"
          value={likes}
          onChange={handleLikesChange}
        /><br></br>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired

}

export default BlogForm