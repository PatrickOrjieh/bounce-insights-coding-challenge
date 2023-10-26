import React, { useState } from 'react';

function App() {
  const [country, setCountry] = useState('');

  const handleInputChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(country);
  };

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
