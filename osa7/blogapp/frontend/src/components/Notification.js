import { Alert } from 'react-bootstrap'

const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    const style = {
        fontSize: 20,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <Alert
            key={notification.type === 'alert' ? 'danger' : 'success'}
            variant={notification.type === 'alert' ? 'danger' : 'success'}
            id='notification'
            style={style}>
            {notification.message}
        </Alert>
    )
}

export default Notification