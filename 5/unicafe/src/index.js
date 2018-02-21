import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'

import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = () => {
  const state = store.getState()
  const palautteita = state.good + state.bad + state.ok
  const average = palautteita === 0 ? 0 : (state.good - state.bad) / palautteita
  const positive = (palautteita === 0 
    ? 0
    : state.good / palautteita) * 100 + "%"

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{state.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{state.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{state.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positive}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={dispatcher('ZERO')}>nollaa tilasto</button>
    </div >
  )
}

const dispatcher = action => () => {
  store.dispatch({type: action})
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({type: nappi})
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const update = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

update()

store.subscribe(update)