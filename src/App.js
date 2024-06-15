import React, { useState, useEffect } from 'react';
import TripGrid from './TripGrid';
import './App.css';

function App() {
  const options = {
    "NYC": "new_york",
    "Ithaca, NY": "ithaca",
    "JFK Airport": "jfk",
    "Binghamton, NY": "binghamton",
    "Rochester, NY": "rochester",
    "Albany, NY": "albany",
    "Buffalo, NY": "buffalo",
    "Syracuse, NY": "syracuse",
    "SYR Airport": "syr_airport",
    "Newark, NJ": "newark",
    "Philadelphia, PA": "philly",
    "Baltimore, MD": "baltimore",
    "Boston, MA": "boston"
  };

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;

  let maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);
  let maxDd = String(maxDate.getDate()).padStart(2, '0');
  let maxMm = String(maxDate.getMonth() + 1).padStart(2, '0');
  let maxYyyy = maxDate.getFullYear();

  maxDate = maxYyyy + '-' + maxMm + '-' + maxDd;

  const [departureLocation, setDepartureLocation] = useState('new_york');
  const [arrivalLocation, setArrivalLocation] = useState('ithaca');
  const [departureDate, setDepartureDate] = useState('');
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiUrl = `https://get-me-home.onrender.com/flix/${departureDate}/${departureLocation}/${arrivalLocation}`;

  async function fetchData() {
    setLoading(true);
    console.log(apiUrl);
    try {
      const response = await fetch(apiUrl, { mode: 'cors' });
      const data = await response.json();
      console.log(data.trips);
      setTrips(data.trips);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleButtonClick = () => {
    if (departureLocation === arrivalLocation) {
      alert('Departure and arrival locations must be different.');
      return;
    }
    setLoading(false);
    fetchData();
  };

  const filterOptions = (selectedOption) => {
    return Object.keys(options).filter(option => option !== selectedOption);
  };

  const handleSelectChange = (setter) => (event) => {
    setter(event.target.value);
    if (setter === setDepartureDate) {
      const dateFromInput = event.target.value.split('-');
      const year = dateFromInput[0];
      const month = dateFromInput[1];
      const day = dateFromInput[2];
      const newYearString = month + '-' + day + '-' + year;
      setDepartureDate(newYearString);
    }
  };

  useEffect(() => {
    console.log(departureDate);
  }, []);

  return (
    <div className="app">
      <h1 className='gmh'>GetMeHome</h1>
      <div className="row">
        <div className="loc_dropdown">
          <h3>Departure</h3>
          <select value={departureLocation} onChange={handleSelectChange(setDepartureLocation)}>
            <option value="" disabled>Select a location</option>
            {filterOptions(arrivalLocation).map(option => (
              <option key={option} value={options[option]}>{option}</option>
            ))}
          </select>
        </div>
        <div className="loc_dropdown">
          <h3>Arrival</h3>
          <select value={arrivalLocation} onChange={handleSelectChange(setArrivalLocation)}>
            <option value="" disabled>Select a location</option>
            {filterOptions(departureLocation).map(option => (
              <option key={option} value={options[option]}>{option}</option>
            ))}
          </select>
        </div>
        <div className="date_dropdown">
          <h3>Date</h3>
          <input type="date" min={today} max={maxDate} onChange={handleSelectChange(setDepartureDate)} />
        </div>
      </div>

      <div className="search">
        <button onClick={handleButtonClick} disabled={!departureDate}>Search</button>
      </div>

      {loading ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        <div className="trip">
          <TripGrid trips={trips} />
        </div>
      )}
    </div>
  );
}

export default App;
