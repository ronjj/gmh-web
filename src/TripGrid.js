import React from 'react';
import TripRowView from './TripRowView';

const TripGrid = ({ trips }) => {
  return (
    <div className="trip-grid">
      {trips.map((trip, index) => (
        <TripRowView key={index} trip={trip} />
      ))}
    </div>
  );
};

export default TripGrid;
