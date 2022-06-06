import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
    const compare = (anecdoteA, anecdoteB) => {
        if (anecdoteA.votes < anecdoteB.votes) {
            return -1
        }
        if (anecdoteA.votes > anecdoteB.votes) {
            return 1
        }
    }
    return (

        anecdotes.sort(compare).map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
                </div>
            </div>
        ))
}

export default AnecdoteList