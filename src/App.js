import React,{ useState } from 'react';
import TripGrid from './TripGrid';
import './App.css';

function App() {
  const exampleTrip = {
    departureDate: '2021-06-01',
    departureTime: '2021-06-01T08:00:00',
    arrivalTime: '2021-06-01T10:00:00',
    duration: 120,
    price: 20.00,
}

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

  const handleButtonClick = () => {
    console.log('button clicked');
    console.log(apiUrl);
  };

  const handleSelectChange = (setter) => (event) => {
    setter(event.target.value);
    if (setter === setDepartureDate) {
      console.log(event.target.value);
      const dateFromInput = event.target.value.split('-');
      const year = dateFromInput[0];
      const month = dateFromInput[1];
      const day = dateFromInput[2];
      const newYearString = month + '-' + day + '-' + year;
      setDepartureDate(newYearString);
    }
  };

  const [departureLocation, setDepartureLocation] = useState('new_york');
  const [arrivalLocation, setArrivalLocation] = useState('ithaca');
  const [departureDate, setDepartureDate] = useState(today);

  const apiUrl = `https://get-me-home.onrender.com/flix/${departureDate}/${departureLocation}/${arrivalLocation}`

  return (
    <div className="app">
      <h1>GetMeHome</h1>
      <div className="loc_dropdown">
        <h3>Departure Location</h3>
        <select onChange={handleSelectChange(setDepartureLocation)}>
          <option value="new_york">NYC</option>
          <option value="ithaca">Ithaca, NY</option>
          <option value="jfk">JFK Airport</option>
          <option value="binghamton">Binghamton, NY</option>
          <option value="rochester">Rochester, NY</option>
          <option value="albany">Albany, NY</option>
          <option value="buffalo">Buffalo, NY</option>
          <option value="syracuse">Syracuse, NY</option>
          <option value="syr_airport">SYR Airport</option>
          <option value="newark">Newark, NJ</option>
          <option value="philly">Philadelphia, PA</option>
          <option value="baltimore">Baltimore, MD</option>
          <option value="boston">Boston, MA</option>
        </select>
      </div>
      <div className="loc_dropdown">
        <h3>Arrival Location</h3>
        <select onChange={handleSelectChange(setArrivalLocation)}>
          <option value="new_york">NYC</option>
          <option value="ithaca">Ithaca, NY</option>
          <option value="jfk">JFK Airport</option>
          <option value="binghamton">Binghamton, NY</option>
          <option value="rochester">Rochester, NY</option>
          <option value="albany">Albany, NY</option>
          <option value="buffalo">Buffalo, NY</option>
          <option value="syracuse">Syracuse, NY</option>
          <option value="syr_airport">SYR Airport</option>
          <option value="newark">Newark, NJ</option>
          <option value="philly">Philadelphia, PA</option>
          <option value="baltimore">Baltimore, MD</option>
          <option value="boston">Boston, MA</option>
        </select>
      </div>
      <div className="date_dropdown">
        <h3>Departure Date</h3>
        <input type="date" min={today} max={maxDate} onChange={handleSelectChange(setDepartureDate)} />
      </div>
      <div className="search">
        <button onClick={handleButtonClick}>Search</button>       
      </div>
      <div className="trip">
        <TripGrid trips={[exampleTrip]}></TripGrid>
        </div>
      </div>
  );
}

export default App;
