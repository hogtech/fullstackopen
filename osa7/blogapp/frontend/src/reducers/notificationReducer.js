const notificationReducer = (state = '', action) => {
    //console.log('notificationReducer action: ', action);
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

export const createNotification = (content) => {
    //console.log('createNotification content:', content);
    return {
        type: 'NEW_NOTIFICATION',
        data: content
    }
}

export default notificationReducer