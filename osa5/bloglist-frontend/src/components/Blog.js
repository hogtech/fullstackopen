import { useState } from 'react'

const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
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
        likes {blog.likes} <button>like</button><br></br>
        {blog.author}
      </div>
    </div>
  )
}

export default Blog