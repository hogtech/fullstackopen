import { createSlice } from '@reduxjs/toolkit'

const initialState = ['notification here']


const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state = initialState, action) {
            return state
        },
    }
})
export default notificationSlice.reducer