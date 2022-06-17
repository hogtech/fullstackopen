import { useDispatch } from "react-redux"
import { appendAnecdote, appendAsyncAnecdote } from "../reducers/anecdoteReducer"
import anecdoteService from "../services/anecdotes"
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
    const add = async (event) => {
        event.preventDefault()
        console.log('prevented');
        const content = event.target.anecdoteInput.value
        event.target.anecdoteInput.value = ''
        //alert(content)
        /* const newAnecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
        console.log('newAnecdote: ', newAnecdote); */
        //dispatch(appendAsyncAnecdote(content))
        props.appendAsyncAnecdote(content)
        console.log('Add anecdote ', content)
    }


    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name="anecdoteInput" />
                    <button type="submit">create</button>
                </div>
            </form>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = {
    appendAsyncAnecdote
}

const ConnectedAnecdoteForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteForm)
export default ConnectedAnecdoteForm