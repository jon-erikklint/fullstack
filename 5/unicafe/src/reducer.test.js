import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  it('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  it('other increments work too', () => {
    const a1 = {type: 'BAD'}
    const a2 = {type: 'OK'}

    const state = initialState

    deepFreeze(state)
    const final = counterReducer(counterReducer(state, a1), a2)
    expect(final).toEqual({
      good: 0,
      ok: 1,
      bad: 1
    })
  })

  const doAll = (start, ...actions) => {
    let state = start
    actions.forEach(action => {
      state = counterReducer(state, action)
    })
    return state
  }

  it('zero works', () => {
    const a1 = {type: 'BAD'}
    const a2 = {type: 'OK'}
    const a3 = {
      type: 'GOOD'
    }
    const zero = {type: 'ZERO'}

    const state = initialState

    deepFreeze(state)
    const result = doAll(a1, a2, a3, a3, a2, a2, zero)
    expect(result).toEqual(initialState)
  })
})