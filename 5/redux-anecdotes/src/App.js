import React from 'react';
import {vote, newAnecdote} from './actions'

class App extends React.Component {
  dispatch = action => () => {
    this.props.store.dispatch(action)
  }

  newAnecdote = event => {
    event.preventDefault()
    this.props.store.dispatch(newAnecdote(event.target.anecdote.value))
    event.target.anecdote.value = ''
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.dispatch(vote(anecdote.id))}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.newAnecdote}>
          <div><input name="anecdote"/></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App