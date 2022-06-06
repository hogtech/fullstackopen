import { useSelector, useDispatch } from 'react-redux'
import reducer from './reducers/anecdoteReducer'
import { vote, addAnecdote } from './reducers/anecdoteReducer'

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
  const add = event => {
    event.preventDefault()
    console.log('prevented');
    const content = event.target.anecdoteInput.value
    event.target.anecdoteInput.value = ''
    alert(content)
    dispatch(addAnecdote(content))
    console.log('Add anecdote ', content)
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
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name="anecdoteInput" />
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default App