import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import logo from './logo.jpg';
import './App.css';

function App() {
  const [country, setCountry] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [filters, setFilters] = useState({ language: '', region: '', subRegion: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFilters({
      language: ["English", "French", "Spanish"],
      region: ["Africa", "Asia", "Europe"],
      subRegion: ["Western Africa", "Eastern Africa", "Southern Africa"]
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`http://localhost:5000/allCountries`)
      .then(response => {
        setCountryData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Error fetching data. Please try again.");
        setLoading(false);
      });
  }, []);
  

  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleInputChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    axios.get(`http://localhost:5000/country/${country}`)
      .then(response => {
        setCountryData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Error fetching data. Please try again.");
        setLoading(false);
      });
  };

  const handleCountryClick = (country) => {
    console.log(country);
  };

  return (
    <div className="App container-fluid">
      <nav className="navbar">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="" width="60" height="60" className="d-inline-block align-text-top" /> &nbsp;
            Countries Coding Challenge - Patrick Orjieh
          </a>
        </div>
      </nav>

      <div className="jumbotron mb-3">
        <h2 className="display-6">Welcome to Countries Coding Challenge</h2>
        <p className="lead">Discover information about countries worldwide.</p>
        <hr className="my-4" />
        <div className="text-center">
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
      <hr className="my-4" />

      <div className="row mt-4">
        <div className="col-md-3">
          <h5>Filters</h5>
          <hr />
          <div className="form-group">
            <label>Language</label>
            <select name="language" className="form-control" onChange={handleFilterChange}>
              {filters.language && filters.language.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Region</label>
            <select name="region" className="form-control" onChange={handleFilterChange}>
              {filters.region && filters.region.map(region => <option key={region} value={region}>{region}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Sub Region</label>
            <select name="subRegion" className="form-control" onChange={handleFilterChange}>
              {filters.subRegion && filters.subRegion.map(subRegion => <option key={subRegion} value={subRegion}>{subRegion}</option>)}
            </select>
          </div>
        </div>

        <div className="col-md-6 text-center">
          <form onSubmit={handleSubmit} className="d-flex justify-content-between">
            <div className="col-md-10 p-0">
              <input
                type="text"
                value={country}
                onChange={handleInputChange}
                placeholder="Enter country name"
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary ml-2 search">Search</button>
            </div>
          </form>

          <div className="row mt-4">
            {countryData.map(country => (
              <div className="col-md-4 mb-3" key={country.name.common}>
                <div className="card h-100" onClick={() => handleCountryClick(country)}>
                  <img
                    src={country.flags.png}
                    alt={`Flag of ${country.name.common}`}
                    className="card-img-top fixed-height-image"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{country.name.common}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {loading && <BeatLoader color={"#123abc"} />}
          {error && <p>{error}</p>}
        </div>

        <div className="col-md-3"></div>

      </div>
    </div>
  );
}

export default App;
