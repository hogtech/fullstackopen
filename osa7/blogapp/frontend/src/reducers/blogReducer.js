import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {

        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            console.log('setBlogs: ', action.payload);
            return action.payload
        }
    }
})

export const initializeBlogs = () => {
    console.log('initializeBlogs: ')
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = content => {
    console.log('createBlog: ', content)
    return async dispatch => {
        const newBlog = await blogService.createNew(content)
        dispatch(appendBlog(newBlog))
    }
}

export const { appendBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer