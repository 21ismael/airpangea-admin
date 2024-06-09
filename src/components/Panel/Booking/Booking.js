import React, { useState, useEffect } from 'react';
import AddBooking from './AddBooking';
import SeatMap from './SeatMap';
import BookingTable from './BookingTable';
import BookingService from '../../../services/BookingService';

export default function Booking() {
  const bookingService = new BookingService();

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const bookingsData = await bookingService.getAllBookings();
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="container-fluid my-5">
      <div className="row">

        <div className="col-md-5 mb-3">
          <SeatMap />
        </div>

        <div className="col-md-7">
          <AddBooking fetchBookings={fetchBookings} />
          <BookingTable bookings={bookings} />
        </div>
      </div>
    </div>
  );
}
