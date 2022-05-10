import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [newBlog, setNewBlog] = useState(null)
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [url, setUrl] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


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
        <Blog key={blog.id} blog={blog} />
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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

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

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const blogForm = () => (
    <div>
      <h1>create new</h1>
      <Notification message={errorMessage} />
      <form onSubmit={addBlog}>
        <label htmlFor="title">title</label>
        <input
          id="input"
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
        <button type="submit">create</button>
      </form>
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
  /* return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  ) */
}

export default App
