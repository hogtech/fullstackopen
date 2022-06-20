import { useState } from 'react'
import PropTypes from 'prop-types'
import { ListGroup, Button } from 'react-bootstrap'
import '../index.css'

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
            {own && <button onClick={() => removeBlog(blog.id)}>
                remove
            </button>}
        </div>
    )
}

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
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