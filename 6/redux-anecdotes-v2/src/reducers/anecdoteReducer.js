const reducer = (store = [], action) => {
  if (action.type==='UPDATE') {
    const old = store.filter(a => a.id !==action.anecdote.id)

    return [...old, action.anecdote ]
  }
  if (action.type === 'CREATE') {

    return [...store, action.content]
  }
  if (action.type === 'INIT') {
    return action.anecdotes
  }

  return store
}

export const update = anecdote => ({
  type: 'UPDATE',
  anecdote
})

export const create = content => ({
  type: 'CREATE',
  content
})

export const init = anecdotes => ({
  type: 'INIT',
  anecdotes
})

export default reducer