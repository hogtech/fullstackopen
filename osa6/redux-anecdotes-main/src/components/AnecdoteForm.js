import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
    const add = async (event) => {
        event.preventDefault()
        console.log('prevented');
        const content = event.target.anecdoteInput.value
        event.target.anecdoteInput.value = ''
        //alert(content)
        const newAnecdote = await anecdoteService.createNew(content)
        //dispatch(addAnecdote(newAnecdote))
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
