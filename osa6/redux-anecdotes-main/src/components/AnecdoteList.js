import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"
const AnecdoteList = () => {
    let anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter).toLowerCase()
    anecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
    console.log('filtered: ', anecdotes);
    const compare = (anecdoteA, anecdoteB) => {
        if (anecdoteA.votes > anecdoteB.votes) {
            return -1
        }
        if (anecdoteA.votes < anecdoteB.votes) {
            return 1
        }
    }
    const dispatchVote = (id) => {
        dispatch(vote(id))
        const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id).content
        const notificationMessage = (`you voted '${votedAnecdote}'`)
        dispatch(showNotification(notificationMessage))
        setTimeout(() => {
            dispatch(showNotification(''))
        }, '5000')
        //dispatch(showNotification(''))
    }
    return (

        [...anecdotes].sort(compare).map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => dispatchVote(anecdote.id)}>vote</button>
                </div>
            </div>
        ))
}

export default AnecdoteList