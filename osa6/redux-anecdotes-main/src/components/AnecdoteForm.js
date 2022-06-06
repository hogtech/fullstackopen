import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
    const add = event => {
        event.preventDefault()
        console.log('prevented');
        const content = event.target.anecdoteInput.value
        event.target.anecdoteInput.value = ''
        //alert(content)
        dispatch(addAnecdote(content))
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

export default AnecdoteForm
