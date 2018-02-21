const vote = id => ({type: 'VOTE', data: id})
const newAnecdote = anecdote => ({type: 'NEW', data: anecdote})

export {vote, newAnecdote}