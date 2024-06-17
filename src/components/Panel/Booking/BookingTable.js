import React from 'react';
import './BookingTable.css';
import convertToAP from '../../../utils/convertToAP';
import UsersService from '../../../services/UsersService';

export default function BookingTable({ bookings }) {
  return (
    <div className="table-container mt-3 corners">
      <table className="table table-striped">
        <thead >
          <tr className='bg-black'>
            <th>ID</th>
            <th>Flight ID</th>
            <th>Passenger ID</th>
            <th>Fare</th>
            <th>Seat</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{convertToAP(booking.flightId)}</td>
              <td>{booking.passengerId}</td>
              <td>{booking.fare}</td>
              <td>{booking.seat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
