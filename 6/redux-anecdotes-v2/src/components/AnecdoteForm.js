import React from 'react'
import { connect } from 'react-redux'

import { create } from '../reducers/anecdoteReducer'
import { set, unset } from '../reducers/notificationReducer'

import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''

    const result = await anecdoteService.save({ content: content, likes: 0 })

    this.props.create(result)
    this.props.set('you created \'' + content + '\'')
    setTimeout(() => {this.props.unset()}, 5000)
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

export default connect(null, { create, set, unset })(AnecdoteForm)
