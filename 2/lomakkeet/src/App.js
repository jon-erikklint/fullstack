import React from 'react';

import personService from './services/persons'

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
    personService.getAll().then(persons => this.setState({persons}))
  }

  save = event => {
    event.preventDefault()

    const person = {name: this.state.newName, number: this.state.newNumber}
    let found = this.state.persons.find(person => person.name === this.state.newName)
    if(found) {
      if(window.confirm(found.name + ' on jo luettelossa, haluatko päivittää puhelinnumeron?')) {
        personService.update(person, found.id)
          .then(changedPerson => this.setState({
            persons: this.state.persons.map(p => p.id === changedPerson.id ? changedPerson : p)
          }))
      }
      return
    }

    personService.create(person)
      .then(person => this.setState({
        persons: this.state.persons.concat(person),
        newName: '',
        newNumber: ''
      }))
  }

  remove = personId => () => {
    if(!window.confirm('Haluatko varmasti poistaa henkilön '
        +this.state.persons.find(p => p.id === personId).name)) return
    personService.remove(personId)
      .then(this.setState({persons: this.state.persons.filter(
        person => person.id !== personId
      )}))
  }

  formChange = stateName => event => {
    this.setState({[stateName]: event.target.value})
  }

  render() {
    const persons = this.state.persons.filter(
      person => person.name.toLocaleLowerCase().includes(this.state.filter.toLocaleLowerCase())
    ).map(
      person => <Person key={person.name} person={person} remove={this.remove}/>
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

const Person = ({person, remove}) => 
  <li>
    {person.name} {person.number}
    <button onClick={remove(person.id)}>Poista</button>
  </li>

export default App