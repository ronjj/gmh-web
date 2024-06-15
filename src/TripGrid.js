import React from 'react';
import TripRowView from './TripRowView';

const TripGrid = ({ trips }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Departure Date</th>
          <th>Departure Time</th>
          <th>Arrival Time</th>
          <th>Duration</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {trips.map((trip, index) => (
          <TripRowView key={index} trip={trip} />
        ))}
      </tbody>
    </table>
  );
};

export default TripGrid;