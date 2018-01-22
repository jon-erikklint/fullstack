import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentWillMount() {
    axios.get('http://localhost:3001/persons')
    .then(result => this.setState({persons: result.data}))
  }

  save = event => {
    event.preventDefault()

    if(this.state.persons.find(person => person.name === this.state.newName)) {
      alert('Nimi jo listattu')
      return
    }

    const person = {name: this.state.newName, number: this.state.newNumber}
    const persons = this.state.persons.concat(person)

    this.setState({persons, newName: '', newNumber: ''})
  }

  formChange = stateName => event => {
    this.setState({[stateName]: event.target.value})
  }

  render() {
    const persons = this.state.persons.filter(
      person => person.name.toLocaleLowerCase().includes(this.state.filter.toLocaleLowerCase())
    ).map(
      person => <Person key={person.name} person={person}/>
    )

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Input label="rajaa näytettävät" state={this.state} field="filter" formChanger={this.formChange}/>
        <h2>Lisää uusi</h2>
        <AddNew state={this.state} save={this.save} formChanger={this.formChange} />
        <h2>Numerot</h2>
        <ul>
          {persons}
        </ul>
      </div>
    )
  }
}

const AddNew = ({state, save, formChanger}) => 
  <form onSubmit={save}>
    <Input label="nimi" state={state} field="newName" formChanger={formChanger}/>
    <Input label="numero" state={state} field="newNumber" formChanger={formChanger}/>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>

const Input = ({label, state, field, formChanger}) => 
  <div>
    {label}:
    <input value={state[field]} onChange={formChanger(field)}/>
  </div>

const Person = ({person}) => 
  <li>{person.name} {person.number}</li>

export default App