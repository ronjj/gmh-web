import React from 'react';

const TripRowView = ({ trip }) => {
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };

  const formatTime = (time) => {
    const [hours, minutes, period] = time.split(/[: ]/);
    return `${hours}:${minutes} ${period}`;
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="trip-row">
      <ul>
        <li><strong>Date:</strong> {formatDate(trip.date)}</li>
        <li><strong>Departure Time:</strong> {formatTime(trip.departure_time)}</li>
        <li><strong>Arrival Time:</strong> {formatTime(trip.arrival_time)}</li>
        <li><strong>Departure Location:</strong> {trip.departure_location}</li>
        <li><strong>Arrival Location:</strong> {trip.arrival_location}</li>
        <li><strong>Price:</strong> {formatPrice(trip.price)}</li>
        <li><strong>Bus Service:</strong> {trip.bus_service}</li>
        <li><strong>Non-stop:</strong> {trip.non_stop}</li>
        <li><strong>Intermediate Stops:</strong>
          <ul>
            {trip.intermediate_stations.map((station, index) => (
              <li key={index}>{station}</li>
            ))}
          </ul>
        </li>
        <li><strong>Ticket Link:</strong> <a href={trip.ticket_link} target="_blank" rel="noopener noreferrer">Buy Ticket</a></li>
      </ul>
    </div>
  );
};

export default TripRowView;
