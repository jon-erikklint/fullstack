import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  kasvata = arviotyyppi => () => {
    this.setState({ [arviotyyppi]: this.state[arviotyyppi] + 1 })
  }

  render () {
    return (
      <div>
        <Palautepainikkeet kutsufunktio={this.kasvata} painikearvot={this.state} />
        <Statistiikat arviot={this.state} />
      </div>
    )
  }
}

const Palautepainikkeet = ({ kutsufunktio, painikearvot }) => {
  return (
    <div>
      <h1>Anna palautetta</h1>
      {Object.keys(painikearvot).map(avain =>
        <Arviontipainike key={avain} funktio={kutsufunktio(avain)} teksti={avain} />
      )}
    </div>
  )
}

const Arviontipainike = ({ funktio, teksti }) => {
  return (
    <div style={{display: "inline-block"}}>
      <button onClick={funktio}>{teksti}</button>
    </div>
  )
}

const Statistiikat = ({ arviot: { hyva, neutraali, huono } }) => {
  let summa = (hyva + huono + neutraali)
  let statistiikat

  if(!summa) {
    statistiikat = (
      <p>yhtään palautetta ei annettu</p>
    )
  } else {
    let keskiarvo = (huono*-1 + hyva*1) / summa
    let positiivisia = hyva/summa * 100 + '%'

    statistiikat = (
      <table>
        <tbody>
          <Statistiikka nimi={"Hyvä"} arvo={hyva}/>
          <Statistiikka nimi={"Neutraali"} arvo={neutraali}/>
          <Statistiikka nimi={"Huono"} arvo={huono}/>
          <Statistiikka nimi={"Keskiarvo"} arvo={keskiarvo}/>
          <Statistiikka nimi={"Positiivisia"} arvo={positiivisia}/>
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <h1>Statistiikka</h1>
      {statistiikat}
    </div>
  )
}

const Statistiikka = ({nimi, arvo}) => {
  return (
    <tr>
      <td>{nimi}</td>
      <td>{arvo}</td>
    </tr>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));