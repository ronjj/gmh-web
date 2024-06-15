import React,{ useState } from 'react';
import './App.css';

function App() {
  const apiUrl = `https://get-me-home.onrender.com/flix/06-20-2024/new_york/ithaca`
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  
  today = yyyy + '-' + mm + '-' + dd;
  
  let maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);
  let maxDd = String(maxDate.getDate()).padStart(2, '0');
  let maxMm = String(maxDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  let maxYyyy = maxDate.getFullYear();
  
  maxDate = maxYyyy + '-' + maxMm + '-' + maxDd;

  return (
    <div className="app">
      <h1>GetMeHome</h1>
      <div className="loc_dropdown">
        <h3>Departure Location</h3>
        <select>
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
        <select>
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
        <h3>Date</h3>
        <input type="date" min={today} max={maxDate}></input>
      </div>
    </div>
  );
}

export default App;
