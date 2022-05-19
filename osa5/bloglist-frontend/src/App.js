import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [newBlog, setNewBlog] = useState(null)
  /* const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [url, setUrl] = useState(null) */
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log('loggedUserJSON user.token: ', user.token)
      blogService.setToken(user.token)
    }
  }, [])

  const like = async (id, blog) => {
    try {
      await blogService.update(id, blog)
      await blogService.getAll().then(blogs =>
        setBlogs(blogs))
    } catch (error) {
      console.log('error in like')
    }

  }
  const logout = () => {
    window.localStorage.removeItem(
      'loggedBlogAppUser'
    )
    window.location.reload(false)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
      <Notification message={errorMessage} />
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  const blogsList = () => (
    <div>
      <h2>blogs</h2>

      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          makeLikeCallback={like}
        />
      )}

    </div>
  )
  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('handleLogin user.token: ', user.token)
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        //setNewBlog('')
        setErrorMessage(`a new blog ${returnedBlog.title.toString()} by ${returnedBlog.author.toString()} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      )
  }


  const blogForm = () => (
    <div>

      <Notification message={errorMessage} />
      <Togglable buttonLabel="create new blog" ref={blogFormRef} togglableCloseButtonLabel='cancel'>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
    </div>
  )
  return(
    <div>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in <button onClick={logout}>
            logout
          </button></p>
          {blogForm()}
          {blogsList()}
        </div>
      }
    </div>
  )

}

export default App
