import { useSelector, useDispatch } from 'react-redux'
import reducer from './reducers/anecdoteReducer'
import { vote, addAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  /*  const vote = (id) => {
     dispatch({
       type: 'VOTE',
       id: id
     })
     console.log('vote', id)
   } */

  /* const add = (event) => {
    event.preventDefault()
    const content = event.target.anecdoteInput.value
    alert(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      content: content
    })
    console.log('Add anecdote ', content)

  } */
  const compare = (anecdoteA, anecdoteB) => {
    if (anecdoteA.votes < anecdoteB.votes) {
      return -1
    }
    if (anecdoteA.votes > anecdoteB.votes) {
      return 1
    }
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(compare).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm></AnecdoteForm>

    </div>
  )
}

export default App