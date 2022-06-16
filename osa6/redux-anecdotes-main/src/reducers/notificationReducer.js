const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'anecdotes/makeNotification':
            return action.payload.message;
        default:
            return state;
    }
};

const makeNotification = (message) => ({
    type: 'anecdotes/makeNotification',
    payload: { message },
});

export const setNotification = (message, length) => (dispatch) => {
    dispatch(makeNotification(message))
    length = length * 1000
    setTimeout(() => dispatch(makeNotification('')), length)
};

export default notificationReducer;