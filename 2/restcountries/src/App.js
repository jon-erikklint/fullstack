import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  formChange = stateName => event => {
    this.setState({ [stateName]: event.target.value })
  }

  componentWillMount () {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(result => this.setState({ countries: result.data }))
  }

  selectCountry = countryName => () => {
    this.setState({filter: countryName})
  }

  render () {
    let selected = this.state.countries.filter(
      country => country.name.toLocaleLowerCase().includes(this.state.filter.toLocaleLowerCase())
    )
    let selection = ''
    if (selected.length > 10) {
      selection = <div>too many matches, specify an another filter</div>
    } else if (selected.length > 1) {
      selection = <Countries countries={selected} selector={this.selectCountry} />
    } else if (selected.length === 1) {
      selection = <Country country={selected[0]} />
    }

    return (
      <div>
        <div>
          find countries: <input value={this.state.filter} onChange={this.formChange('filter')} />
        </div>
        {selection}
      </div>
    );
  }
}

const Country = ({country}) => 
  <div>
    <h1>{country.name} - {country.nativeName}</h1>
    <p>capital: {country.capital}</p>
    <p>population: {country.population}</p>
    <img alt='flag' src={country.flag}></img>
  </div>

const Countries = ({countries, selector}) =>
  <ul>
    {countries.map(country => 
      <li key={country.name} onClick={selector(country.name)}>{country.name}</li>)}
  </ul>

export default App;
