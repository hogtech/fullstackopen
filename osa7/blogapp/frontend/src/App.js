import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/user'

import { Button } from 'react-bootstrap'

import { createNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, createBlog, addLike, removeB } from './reducers/blogReducer'
import store from './store'

const App = () => {
    const dispatch = useDispatch()

    //const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    //const [notification, setNotification] = useState(null)
    const blogFormRef = useRef()
    const byLikes = (b1, b2) => b2.likes > b1.likes ? 1 : -1
    //dispatch(createBlogList(blogs))
    const blogs = useSelector(state => state.blogs)
    let blogsArray = [...blogs]
    let blogsInOrder = blogsArray.sort(byLikes)
    useEffect(() => {
        dispatch(initializeBlogs())
        console.log('app.js / initializeBlogs here');
        /*  blogService.getAll().then(blogs =>
             setBlogs(blogs.sort(byLikes))
         ) */
    }, [dispatch])

    useEffect(() => {
        const userFromStorage = userService.getUser()
        if (userFromStorage) {
            setUser(userFromStorage)
        }
    }, [])

    const login = async (username, password) => {
        loginService.login({
            username, password,
        }).then(user => {
            setUser(user)
            userService.setUser(user)
            notify(`${user.name} logged in!`)
        }).catch(() => {
            notify('wrong username/password', 'alert')
        })
    }

    const logout = () => {
        setUser(null)
        userService.clearUser()
        notify('good bye!')
    }

    const addBlog = (blog) => {
        console.log('inside addBlog')
        dispatch(createBlog(blog))
        notify(`a new blog '${blog.title}' by ${blog.author} added`)
        //setBlogs(blogs.concat(blog))
        blogFormRef.current.toggleVisibility()
    }

    const removeBlog = (id) => {
        const toRemove = blogs.find(b => b.id === id)

        const ok = window.confirm(`remove '${toRemove.title}' by ${toRemove.author}?`)

        if (!ok) {
            return
        }
        notify(`removed ${toRemove.title} by ${toRemove.author}`)
        dispatch(removeB(toRemove))
    }


    const likeBlog = async (id) => {

        const toLike = blogs.find(b => b.id === id)
        console.log('likeBlog toLike: ', toLike)
        dispatch(addLike(toLike))
        notify(`you liked '${toLike.title}' by ${toLike.author}`)
        const updatedBlogs = blogs
            .map(b => b.id === id ? toLike : b)
            .sort(byLikes)
        console.log('likeBlog byLikes: ', byLikes)
        console.log('likeBlog blogs: ', blogs)
        console.log('likeBlog updatedBlogs: ', updatedBlogs);
        /* const liked = {
            ...toLike,
            likes: (toLike.likes || 0) + 1,
            user: toLike.user.id
        }
    
        blogService.update(liked.id, liked).then(updatedBlog => {
            notify(`you liked '${updatedBlog.title}' by ${updatedBlog.author}`)
            const updatedBlogs = blogs
                .map(b => b.id === id ? updatedBlog : b)
                .sort(byLikes)
            //setBlogs(updatedBlogs)
        }) */
    }

    const notify = (message, type = 'info') => {
        /*   setNotification({ message, type })
          setTimeout(() => {
              setNotification(null)
          }, 5000) */
        dispatch(createNotification({ message, type }))
        setTimeout(() => {
            dispatch(createNotification('', type))
        }, 5000
        )
    }

    if (user === null) {
        return <div className='container'>
            <Notification />
            <LoginForm onLogin={login} />
        </div>
    }

    return (
        <div className='container'>
            <h2>blogs</h2>

            <Notification />

            <div>
                {user.name} logged in&nbsp;
                <Button variant='info' onClick={logout}>logout</Button>
            </div>

            <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <NewBlogForm
                    onCreate={addBlog}
                />
            </Togglable>

            <div id='blogs'>
                {blogsInOrder.map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                        likeBlog={likeBlog}
                        removeBlog={removeBlog}
                        user={user}
                    />
                )}
            </div>
        </div>
    )
}

export default App