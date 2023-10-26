import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [country, setCountry] = useState('');

  const handleInputChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(country);
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
    </div>
  );
}

export default App;
