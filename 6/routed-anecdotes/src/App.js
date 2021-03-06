import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap'

const Menu = () => {
  const active = {
    backgroundColor: "blue"
  }
  const usual = {
    padding: 0,
    margin: 0,
    border: 0,
    height: 20,
    flex: 1,
    textAlign: 'center'
  }
  return (
    <div style={{
      backgroundColor: 'lightblue',
      padding: 0,
      display: 'flex'
    }}>    
      <NavLink exact to="/" activeStyle={active} style={usual}>anecdotes</NavLink>&nbsp;
      <NavLink to="/create" activeStyle={active} style={usual}>create new</NavLink>&nbsp;
      <NavLink to="/about" activeStyle={active} style={usual}>about</NavLink>&nbsp;
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => 
      <ListGroupItem key={anecdote.id} >
        <Link to={'/anecdotes/'+anecdote.id}>{anecdote.content}</Link>
      </ListGroupItem>)}
    </ListGroup>  
  </div>
)

const About = () => (
  <Grid>
    <Row className="showGrid">
      <h2>About anecdote app</h2>
    </Row>
    <Row className="showGrid">
      <Col xs={6} md={9}>
        <p>According to Wikipedia:</p>
        
        <em>An anecdote is a brief, revealing account of an individual person or an incident. 
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
          An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Col>
      <Col xs={2} md={3}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Edsger_Wybe_Dijkstra.jpg/250px-Edsger_Wybe_Dijkstra.jpg">
        </img>
      </Col>
    </Row>
  </Grid>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

const Anecdote = ({anecdote}) => (
  <div>
    <h1>{anecdote.content + " by " + anecdote.author}</h1>
    <div>has {anecdote.votes} votes</div>
    <br/>
    <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
    <br/>
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.setNotification('a new anecdote '+this.state.content+' created!')
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button>create</button>
        </form>
      </div>  
    )

  }
}

const Notification = ({notification}) =>
  notification 
    ? <div style={{
      border: '1px solid green',
      borderRadius: 4,
      padding: 5,
      margin: '4px 2px',
      color: 'green'
    }}>
      {notification}
    </div>
    : null

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  setNotification = (message, time = 10000) => {
    this.setState({notification: message})
    setTimeout(() => {
      this.setState({notification: null})
    }, time)
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <h1>Software anecdotes</h1>
              <Menu />
              <Notification notification={this.state.notification}/>
              <Route exact path="/" render={
                () => <AnecdoteList anecdotes={this.state.anecdotes} />}
                />
              <Route path="/create" render={
                ({history}) => <CreateNew history={history} addNew={this.addNew} setNotification={this.setNotification}/>
              }/>
              <Route path="/about" render={
                () => <About />  
              }/>
              <Route path="/anecdotes/:id" render={
                ({match}) => <Anecdote anecdote={this.anecdoteById(match.params.id)}/>
              }/> 
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
