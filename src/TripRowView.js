import React from 'react';

const TripRowView = ({ trip }) => {
    const formatDate = (date) => {
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        });
        return formattedDate;
    };

    const formatTime = (time) => {
        const formattedTime = new Date(time).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
        return formattedTime;
    };

    const formatDuration = (duration) => {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        return `${hours} hours ${minutes} minutes`;
    };

    const formatPrice = (price) => {
        return `$${price.toFixed(2)}`;
    };

    return (
        <tr className="trip_row">
            <td className="trip_date">{formatDate(trip.departureDate)}</td>
            <td className="trip_time">{formatTime(trip.departureTime)}</td>
            <td className="trip_time">{formatTime(trip.arrivalTime)}</td>
            <td className="trip_duration">{formatDuration(trip.duration)}</td>
            <td className="trip_price">{formatPrice(trip.price)}</td>
        </tr>
    );
};

export default TripRowView;
