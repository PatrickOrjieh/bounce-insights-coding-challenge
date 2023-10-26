import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import logo from './logo.jpg';
import './App.css';

function App() {
  const [country, setCountry] = useState('');
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleInputChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    axios.get(`http://localhost:5000/country/${country}`)
      .then(response => {
        setCountryData(response.data[0]);
        setLoading(false);
      })
      .catch(err => {
        setError("Error fetching data. Please try again.");
        setLoading(false);
      });
  };


  useEffect(() => {
    axios.get('http://localhost:5000/test')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error connecting to backend:", error);
      });
  }, []);

  return (
    <div className="App" class="container-fluid">
      <nav class="navbar">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img src={logo} alt="" width="60" height="60" class="d-inline-block align-text-top" /> &nbsp;
            Countries Coding Challenge - Patrick Orjieh
          </a>
        </div>
      </nav>

      <div className="jumbotron mb-3">
        <h2 className="display-6">Welcome to Countries Coding Challenge</h2>
        <p className="lead">Discover information about countries worldwide.</p>
        <hr className="my-4" />
        <div class="text-center">
          <p>Select a starting letter to view countries:</p>
          <div className="alphabet-list">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map(letter => (
              <button className="btn btn-outline-primary mr-2" key={letter}>
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={country}
            onChange={handleInputChange}
            placeholder="Enter country name"
          />
          <button type="submit">Search</button>
        </form>
      </div>



      {loading && <BeatLoader color={"#123abc"} />}
      {error && <p>{error}</p>}
      {countryData && (
        <div>
          <h2>{countryData.name.common}</h2>
          <p>Capital: {countryData.capital[0]}</p>
          <p>Region: {countryData.region}</p>
        </div>
      )}
    </div>
  );

}

export default App;
