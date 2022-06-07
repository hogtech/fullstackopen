//import { useSelector, useDispatch } from 'react-redux'
//import reducer from './reducers/anecdoteReducer'
//import { vote, addAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm></AnecdoteForm>
      <AnecdoteList></AnecdoteList>
    </div>
  )
}

export default App