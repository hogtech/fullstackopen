import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { ListGroup, Button } from 'react-bootstrap'
import { useState } from 'react'
import '../index.css'
import { createBlogList } from '../reducers/blogReducer'

const BlogDetails = ({ blog, visible, likeBlog, removeBlog, own }) => {
    if (!visible) return null
    const style = {
    }

    const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'

    return (
        <div style={style}>
            <div>
                <a href={blog.url}>{blog.url}</a>
            </div>
            <div>
                {blog.likes} likes <Button variant="info" onClick={() => likeBlog(blog.id)}>like</Button>
            </div>
            {addedBy}

            {own && <Button variant="info" onClick={() => removeBlog(blog.id)}>
                remove
            </Button>}
        </div>
    )
}

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
    //let blog1 = useSelector(state => state.blogs)
    //blog1 = blog1.blog1
    //console.log('blog1 state: ', blog1);
    //blog = blog1[0]
    /*     const dispatch = useDispatch()
        dispatch(blogReducer(blog))
        dispatch(blogReducer(likeBlog))
        dispatch(blogReducer(removeBlog))
        dispatch(blogReducer(user)) */
    /*  blog = useSelector(state => state.blog)
     likeBlog = useSelector(state => state.likeBlog)
     removeBlog = useSelector(state => state.removeBlog)
     user = useSelector(state => state.user) */
    //const dispatch = useDispatch()
    //dispatch(createBlogList("blog"))
    //dispatch(createNotification({ message, type }))
    //console.log('Blog blog1: ', blog1);
    const [visible, setVisible] = useState(false)


    return (
        <ListGroup>
            <ListGroup.Item className='blog'>
                {blog.title} {blog.author}&nbsp;
                <Button variant='info' onClick={() => setVisible(!visible)}>
                    {visible ? 'hide' : 'view'}
                </Button>
                <BlogDetails
                    blog={blog}
                    visible={visible}
                    likeBlog={likeBlog}
                    removeBlog={removeBlog}
                    own={blog.user && user.username === blog.user.username}
                />
            </ListGroup.Item>
        </ListGroup>
    )
}

Blog.propTypes = {
    blog: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        user: PropTypes.shape({
            username: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    }).isRequired,
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
    }),
    likeBlog: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
}

export default Blog