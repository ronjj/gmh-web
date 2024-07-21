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
  const [dataFetched, setDataFetched] = useState(false);
  const [departureTime, setDepartureTime] = useState(false); // State for departure time button
  const [arrivalTime, setArrivalTime] = useState(false); // State for departure time button
  const [maxPrice, setMaxPrice] = useState(false); // State for max price button
  const [rangeValue, setRangeValue] = useState(100);

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
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
      setDataFetched(true);
    }
  }

  // Function for determining whether the departureDate field is before/prior to the current (today's) date
  const isPastDate = () => {
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - 1); // Date before the current date
    const tripDate = new Date(departureDate);
    if (tripDate < threshold) {
      return true
    }
    return false
  }

  // Function for determining whether the date is an existent date. Example: Returns false for the date Feb. 30th, 2020 because February has at most 29 days.
  function isExistentDate(dateString) {
    const parts = dateString.split("-");

    const year = parseInt(parts[2], 10);
    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return false
    } 
    return true
  } 

  const handleButtonClick = () => {
    if (departureLocation === arrivalLocation) {
      alert('Input Error: Departure and arrival locations must be different.');
      return;
    }
    if (departureDate.localeCompare('') === 0) {
      alert("Input Error: Date not entered.");
      return;
    }
    if (!isExistentDate(departureDate)) {
      alert("Input Error: Date must be an existent date on the calendar.");
      return;
    }
    if (isPastDate()) {
      alert("Input Error: Date must be on or after today's date.");
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

  const getKey = (value) => {
    for (const op in options) {
      if (options[op] === value) {
        return op
      }
    }
  }

  const switchLocations = () => {
    const temp = arrivalLocation;
    setArrivalLocation(departureLocation);
    setDepartureLocation(temp);
  }

  const changeValue = (event) => {
    setRangeValue(event.target.value);
  }

  return (
    <div className="app">
      <div style={{width: "100vw", height: "100vh", backgroundColor: "black", padding: "0"}}>
        <h1 className='gmh' style={{color: "white"}}>GetMeHome</h1>
        <div className="row">
          <div className="loc_dropdown">
            <h3 style={{color: "white"}}>Departure</h3>
            <select className="primary_field" value={departureLocation} onChange={handleSelectChange(setDepartureLocation)} disabled={loading}>
              <option value="" disabled>Select a location</option>
              {filterOptions(arrivalLocation).map(option => (
                <option key={option} value={options[option]}>{option}</option>
              ))}
            </select>
          </div>
          <div className="loc_dropdown">
            <h3 style={{color: "white"}}>Arrival</h3>
            <select className="primary_field" value={arrivalLocation} onChange={handleSelectChange(setArrivalLocation)} disabled={loading}>
              <option value="" disabled>Select a location</option>
              {filterOptions(departureLocation).map(option => (
                <option key={option} value={options[option]}>{option}</option>
              ))}
            </select>
          </div>
          <div className="date_dropdown">
            <h3 style={{color: "white"}}>Date</h3>
            <input className="primary_field" type="date" min={today} max={maxDate} onChange={handleSelectChange(setDepartureDate)} disabled={loading}/>
          </div>
          <div>
            <button className="primary_field" onClick={switchLocations} disabled={loading}>Switch</button>
          </div>
        </div>

        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginLeft: "1%", marginRight: "2%"}}>
          
          
          <div style={{margin: "1em auto"}}>
            <button className="secondary_field" style={{width: "fit-content"}} onClick={() => setDepartureTime(!departureTime)}>Departure Time</button>
                {
            departureTime && (
              <div style={{color: "white"}}>
                Earliest Departure Time:
                <input style={{color: "white"}} type="time" step="3600" ></input>
              </div>
            )
          }       
          </div>

          <div style={{margin: "1em auto"}}>
            <button className="secondary_field" style={{width: "fit-content"}} onClick={() => setArrivalTime(!arrivalTime)}>Arrival Time</button>
            {
            arrivalTime && (
              <div style={{color: "white"}}>
                Latest Arrival Time:
                <input style={{color: "white"}}type="time" step="3600"></input>
              </div>
            )
          }
          </div>
          
          {/*style={{display:"inline-flex", alignItems: "center"}}*/}
          <div style={{margin: "1em auto"}}>
            <button className="secondary_field" style={{width: "fit-content"}} onClick={() => setMaxPrice(!maxPrice)}>Max Price</button>
            {
            maxPrice && (
              <div style={{color: "white"}}>
                Max Price
                <input type="range" min="1" max="400" step="1" onChange={changeValue} value={rangeValue}></input>
                ${rangeValue}.00
              </div>
            )
          }
          </div>
        </div>

        

        <div className="search">
          <button className="primary_field"  style={{width: "100%"}} onClick={handleButtonClick} disabled={loading}>Search</button>
        </div>

        {loading ? (
          <div className="loading-indicator">Loading...</div>
        ) : trips.length === 0 ? (
          dataFetched ? (
            <div style={{color:"white", textAlign: "center", fontWeight: "bold", marginTop: "2%"}}>
            There are no trips from {getKey(departureLocation)} to {getKey(arrivalLocation)} on the date {departureDate}.
          </div>
          ) : (
            <div style={{color: "white", textAlign: "center", marginTop: "2%"}}>
              <h3>Search For Trips</h3>
              <p>Select a Date, Departure Location, and Destination</p>
            </div>
          )
        ) : (
          <div className="trip">
            <TripGrid trips={trips} dTime={departureTime} aTime={arrivalTime} mPrice={maxPrice} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
