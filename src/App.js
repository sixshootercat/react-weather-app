import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Climate from './components/Climate';
import Error from './components/Error'


function App() {
  
  const [ search, setSearch ] = useState({
    city: '',
    country: ''
  })

  // State to detect if a request is made
  const [ request, setRequest ] = useState(false)
  const [ result, setResult ] = useState({})
  const [ error, setError ] = useState(false)

  const { city, country } = search

  useEffect(() => {
   
    const requestApi = async () => {
      if (request) {
        const appId = process.env.API_KEY
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`
        const res = await fetch(url)
        const result = await res.json()
        setResult(result)
        setRequest(false)
        
        // Detect if there was a result in the request
        if (result.cod === '404') {
          setError(true)
        } else {
          setError(false)
        }
      }
    }
    requestApi()
  }, [request])
  
  let component
  if(error) {
    component = <Error msg="Enter a valid city" />
  } else {
    component = <Climate result={result} />
  }


  return (
    <>
      <Header title="Weather App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form
                search={search}
                setSearch={setSearch}
                setRequest={setRequest}
              />
            </div>
            <div className="col m6 s12">
              {component}
            </div>
          </div>
        </div>
      </div>
      
    </>

  );
}

export default App;
