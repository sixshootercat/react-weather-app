import React from 'react'

const Climate = ({result}) => {
  
  const { name, main } = result

  if(!name) return null

  // Kelvin temp

  const kelvin = 273.15

  return (
    <div className="card-panel white col s12">
      <div className="black-text">
        <h2>The temperature in {name} is: </h2>
        <p className="temperatura">
          {parseFloat(main.temp - kelvin, 10).toFixed(2)}<span> &#x2103;</span>
        </p>
      </div>
    </div>
  )
}

export default Climate
