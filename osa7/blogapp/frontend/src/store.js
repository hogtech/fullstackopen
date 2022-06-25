import notificationReducer from './reducers/notificationReducer'
import { createStore, combineReducers } from 'redux'
import blogReducer from './reducers/blogReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer
    }
})

export default store