import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { set, unset } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  like = anecdote => () => {
    const store = this.props.store

    store.dispatch(vote(anecdote.id))
    store.dispatch(set('you voted \'' + anecdote.content + '\''))
    setTimeout(() => {store.dispatch(unset())}, 5000)
  }

  render() {
    const { filter, anecdotes } = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes
          .sort((a, b) => b.votes - a.votes)
          .filter(anecdote => anecdote.content.includes(filter))
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={this.like(anecdote)}>
                  vote
                </button>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default AnecdoteList
