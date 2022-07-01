import notificationReducer from './reducers/notificationReducer'
import { createStore, combineReducers } from 'redux'
import blogReducer from './reducers/blogReducer'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        user: userReducer
    }
})

export default store