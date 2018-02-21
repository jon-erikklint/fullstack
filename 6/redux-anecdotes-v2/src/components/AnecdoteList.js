import React from 'react'
import { connect } from 'react-redux'

import { update } from '../reducers/anecdoteReducer'
import { set, unset } from '../reducers/notificationReducer'

import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
  like = anecdote => async() => {
    const result = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })

    this.props.update(result)
    this.props.set('you voted \'' + anecdote.content + '\'')
    setTimeout(() => {this.props.unset()}, 5000)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotes.map(anecdote =>
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

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes
      .filter(anecdote => anecdote.content.includes(state.filter))
      .sort((a, b) => b.votes - a.votes)
  }
}

export default connect(mapStateToProps, { update, set, unset })(AnecdoteList)
