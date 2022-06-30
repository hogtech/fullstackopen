import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        makeLike(state, action) {
            //console.log('state: ', state);
            return state.map((element) =>
                action.payload.id !== element.id ?
                    element
                    : { ...element, likes: element.likes + 1 }
            )
        },
        appendBlog(state, action) {
            console.log('appendBlog: ', action.payload);
            state.push(action.payload)
        },
        setBlogs(state, action) {
            console.log('setBlogs: ', action.payload);
            return action.payload
        },
        del(state, action) {
            console.log('blogSlice.remove.action.payload.id: ', action.payload.id)
            const newState = state.filter(element => element.id !== action.payload.id)
            console.log('oldState: ', JSON.stringify(state))
            console.log('newState: ', JSON.stringify(newState))
            return newState
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

export const addLike = (content) => {
    return async dispatch => {
        const blog = await blogService.like(content.id)
        console.log('blog: ', blog)
        dispatch(makeLike(blog))
    }
}
export const removeB = content => {
    return async dispatch => {
        const removedBlog = await blogService.remove(content.id)
        console.log('removedBlog: ', removedBlog)
        dispatch(del(content))
    }

}
export const { appendBlog, setBlogs, makeLike, del } = blogSlice.actions
export default blogSlice.reducer