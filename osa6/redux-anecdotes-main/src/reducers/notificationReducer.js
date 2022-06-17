let timeoutID = null

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'anecdotes/makeNotification':
            if (timeoutID) {
                clearTimeout(timeoutID)
            }
            return action.payload.message;
        default:
            return state;
    }
}

const makeNotification = (message) => ({
    type: 'anecdotes/makeNotification',
    payload: { message },
})

export const setNotification = (message, length) => (dispatch) => {
    dispatch(makeNotification(message))
    length = length * 1000
    timeoutID = setTimeout(() => dispatch(makeNotification('')), length)
    console.log('timeoutID: ', timeoutID)
}

export default notificationReducer;