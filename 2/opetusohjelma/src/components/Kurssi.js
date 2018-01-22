import React from 'react'

const Kurssi = ({kurssi}) => {
  return (
    <div>
      <Otsikko kurssi={kurssi.nimi}/>
      <Sisalto osat={kurssi.osat}/>
      <Yhteensa osat={kurssi.osat}/>
    </div>
  )
}

const Otsikko = props => {
  return (
    <div>
      <h2>{props.kurssi}</h2>
    </div>
  )
}

const Sisalto = ({osat}) => {
  const kaikkiOsat = () => osat.map(osa => <Osa key={osa.id} osa={osa}/>)
  return (
    <ul>
      {kaikkiOsat()}
    </ul>
  )
}

const Osa = p => {
  return (
    <li>{p.osa.nimi} {p.osa.tehtavia}</li>
  )
}

const Yhteensa = ({osat}) => {
  const tehtavia = () => 
    osat.reduce((accumulator, current) => accumulator + current.tehtavia, 0)
  return (
    <div>
      <p>yhteensä {tehtavia()} tehtävää</p>
    </div>
  )
}

export default Kurssi