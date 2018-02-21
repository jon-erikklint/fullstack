const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const increaseOne = (currentState, field) => {
  return {...currentState, [field]: currentState[field] + 1}
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      return increaseOne(state, 'good')
    case 'OK':
      return increaseOne(state, 'ok')
    case 'BAD':
      return increaseOne(state, 'bad')
    case 'ZERO':
      return initialState
  }
  return state
}

export default counterReducer