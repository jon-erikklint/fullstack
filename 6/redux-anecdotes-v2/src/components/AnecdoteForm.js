import React from 'react'
import { create } from '../reducers/anecdoteReducer'
import { set, unset } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    const store = this.props.store

    store.dispatch(create(content))
    store.dispatch(set('you created \'' + content + '\''))
    setTimeout(() => {store.dispatch(unset())}, 5000)

    e.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm
