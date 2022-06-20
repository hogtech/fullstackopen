import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'
const Notification = ({ notification }) => {
    notification = useSelector(state => state)
    console.log('notification.message state: ', notification.message);
    if (notification === '') {
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