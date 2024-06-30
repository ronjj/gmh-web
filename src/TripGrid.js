import React from 'react';
import TripRowView from './TripRowView';

const TripGrid = ({ trips, dTime, aTime, mPrice}) => {
  return (
    <div className="trip-grid" style={{color: "white"}}>
      {trips.map((trip, index) => (
        <TripRowView key={index} trip={trip} />
      ))}
    </div>
  );
};

export default TripGrid;
