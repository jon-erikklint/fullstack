import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: {}
    }
  }

  selectRandom = () => {
    this.setState({selected: Math.floor(Math.random() * this.props.anecdotes.length)})
  }

  voteFor = (anecdote) => () => {
    let newVotes = Object.assign({}, this.state.votes)
    let votes = 1
    if(newVotes[anecdote]) {
      votes = newVotes[anecdote] + 1
    }
    newVotes[anecdote] = votes

    this.setState({votes: newVotes})
  }

  votes = (selected) => {
    let votes = this.state.votes[selected]
    return !votes ? 0 : votes
  }

  render() {
    let selected = this.props.anecdotes[this.state.selected]
    let withMost = Object.values(this.props.anecdotes).sort((a, b) =>{
      let votes1 = this.state.votes[a]
      let votes2 = this.state.votes[b]
      return votes2 - votes1
    })[0] // Tehokkuusuhri laiskuuden alttarille

    return (
      <div>
        <Anecdote anecdote={selected} votes={this.votes}/>
        <br/>
        <Button func={this.voteFor(selected)} text={"vote for"}/>
        <Button func={this.selectRandom} text={"next anecdote"}/>

        <h1>Anecdote with most votes</h1>
        <Anecdote anecdote={withMost} votes={this.votes}/>
      </div>
    )
  }
}

const Anecdote = ({anecdote, votes}) => {
  return (
    <div>
      <p>
        {anecdote}
      </p>
      <p>
        has {votes(anecdote)} votes
      </p>
    </div>
  )
}

const Button = ({func, text}) => {
  return (
    <button onClick={func}>
      {text}
    </button>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)