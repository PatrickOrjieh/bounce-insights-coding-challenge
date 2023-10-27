import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import logo from './logo.jpg';
import './App.css';

function App() {
  const [country, setCountry] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 12;
  const [showModal, setShowModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

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

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countryData.slice(indexOfFirstCountry, indexOfLastCountry);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(countryData.length / countriesPerPage);

  const handleInputChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);  // Reset to the first page
    setLoading(true);
    setError(null);
    if (country.trim() === '') {
      // Fetch all countries if input is empty
      axios.get(`http://localhost:5000/allCountries`)
        .then(response => {
          setCountryData(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError("Error fetching data. Please try again.");
          setCountryData([]);  // Clear the countries data
          setLoading(false);
        });
        
    } else {
      // Fetch specific country
      axios.get(`http://localhost:5000/country/${country}`)
        .then(response => {
          setCountryData(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError("Error fetching data. Please try again.");
          setCountryData([]);  // Clear the countries data
          setLoading(false);
        });
        
    }
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    setShowModal(true);
  };

  const fetchCountriesByLetter = (letter) => {
    setLoading(true);
    setError(null);

    axios.get(`http://localhost:5000/countriesByLetter/${letter}`)
      .then(response => {
        setCountryData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Error fetching data. Please try again.");
        setLoading(false);
      });
  };


  const renderModal = () => {
    if (!selectedCountry) return null;

    return (
      <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" style={{ display: `${showModal ? 'block' : 'none'}` }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{selectedCountry.name.common}</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} className="img-fluid mb-3" />
                  <p><strong>Capital:</strong> {selectedCountry.capital[0]}</p>
                  <p><strong>Region:</strong> {selectedCountry.region}</p>
                  <p><strong>Population:</strong> {selectedCountry.population}</p>
                  <p><strong>Area:</strong> {selectedCountry.area} km<sup>2</sup></p>
                  <p><strong>Timezone:</strong> {selectedCountry.timezones[0]}</p>
                  <p><strong>Currency:</strong> {Object.keys(selectedCountry.currencies)[0]}</p>
                  <p><strong>Language:</strong> {selectedCountry.languages[Object.keys(selectedCountry.languages)[0]]}</p>
                  <p><strong>Calling Code:</strong> {selectedCountry.idd.root + selectedCountry.idd.suffixes[0]}</p>
                  <p><strong>Sub Region:</strong> {selectedCountry.subregion}</p>
                  <p><strong>Demonym:</strong> {selectedCountry.demonyms.eng.m}</p>
                </div>

                <div className="col-md-6">
                  <iframe
                    width="100%"
                    height="250"
                    src={`https://maps.google.com/maps?q=${selectedCountry.latlng[0]},${selectedCountry.latlng[1]}&z=6&output=embed`}
                    title={`Map of ${selectedCountry.name.common}`}
                  ></iframe>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
              <button
                className="btn btn-outline-primary mr-2"
                key={letter}
                onClick={() => fetchCountriesByLetter(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>
      <hr className="my-4" />

      <div className="row mt-4 justify-content-center">
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

          {loading && <BeatLoader color={"#123abc"} />}


          <div className="row mt-4">
            {currentCountries.map(country => (
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

          {/* Pagination Controls */}
          <div className="pagination mt-4 mb-3">
            {[...Array(totalPages)].map((e, index) => (
              <button key={index + 1} className={`btn btn-${currentPage === index + 1 ? "primary" : "outline-primary"} mr-2`} onClick={() => handlePageClick(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>

          {error && <p>{error}</p>}
        </div>

        <div className="col-md-1"></div>

      </div>
      {renderModal()}
    </div>
  );
}

export default App;
