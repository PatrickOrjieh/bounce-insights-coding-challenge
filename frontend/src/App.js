import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

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
    <div className="App">
      <h1>Country Information</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={country}
          onChange={handleInputChange}
          placeholder="Enter country name"
        />
        <button type="submit">Search</button>
      </form>

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
