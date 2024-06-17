import React from 'react';
import './BookingTable.css';
import formattedDate from '../../../utils/formattedDate';
import convertToAP from '../../../utils/convertToAP';

export default function BookingTable({ bookings }) {
  return (
    <div className="table-container mt-3 corners">
      <table className="table table-striped">
        <thead >
          <tr className='bg-black'>
            <th>ID</th>
            <th>Fare</th>
            <th>Seat</th>
            <th>Passenger ID</th>
            <th>Flight ID</th>
            <th>Departure Date Time</th>
            <th>Arrival Date Time</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.fare}</td>
              <td>{booking.seat}</td>
              <td>{booking.passengerId}</td>
              <td>{convertToAP(booking.flightId)}</td>
              <td>{formattedDate(booking.flight.departureDateTime)}</td>
              <td>{formattedDate(booking.flight.arrivalDateTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
