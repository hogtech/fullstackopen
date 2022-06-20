import { useState } from 'react'
import { Button } from 'react-bootstrap'
import '../index.css'

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        onLogin(username, password)
    }
    const style = {
        color: '333333'
    }

    return (
        <div className='login'>
            <h2>Log in to application</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    username &nbsp;
                    <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                        id='username'
                    />
                </div>
                <div>
                    password &nbsp;
                    <input
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        id="password"
                    />
                </div>
                <Button variant='info' id="login-button" type="submit">
                    login
                </Button>
            </form>
        </div>
    )
}

export default LoginForm