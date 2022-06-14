import { createSlice } from '@reduxjs/toolkit'

const initialState = ''


const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        makeFilter(state = initialState, action) {
            console.log('makeFilter: ', action.payload);
            const content = action.payload
            return content
        },
    }
})

export const { makeFilter } = filterSlice.actions

export default filterSlice.reducer