import React, { useState, useEffect } from 'react';
import BookingService from '../../../services/BookingService';
import FlightsService from '../../../services/FlightsService';

export default function AddBooking() {
    const bookingService = new BookingService();
    const flightService = new FlightsService();

    const initialBookingState = {
        passengerId: "",
        flightId: "",
        fare: "Basic",
        seat: ""
    };

    const [booking, setBooking] = useState(initialBookingState);
    const [errorMessage, setErrorMessage] = useState("");
    const [flight, setFlight] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBooking({ ...booking, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await bookingService.addBooking(booking);
            
            const updatedSeats = updateSeatAvailability(flight.seats, booking.seat, 'X');
            const updatedFlight = { ...flight, seats: updatedSeats };
            alert(JSON.stringify(updatedFlight))
            alert(updatedFlight.seats.length)
            await flightService.updateFlight(updatedFlight);

            alert(JSON.stringify(booking));
            setBooking(initialBookingState);
            setFlight(updatedFlight); 
            setErrorMessage("");
        } catch (error) {
            console.error('Error adding booking:', error);
            setErrorMessage("There was an error adding the booking.");
        }
    };

    const handleFlightIdBlur = async () => {
        if (booking.flightId.trim() !== "") {
            try {
                const flightData = await flightService.getFlightById(booking.flightId);
                setFlight(flightData);
                setErrorMessage("");
            } catch (error) {
                console.error('Error fetching flight:', error);
                setFlight(null);
                setErrorMessage("There was an error fetching the flight.");
            }
        }
    };

    const updateSeatAvailability = (seatString, seat, status) => {
        const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        const seatArray = seatString.split('').filter(s => s !== ' ');
        const seatIndex = rows.indexOf(seat[0]) * 3 + parseInt(seat[1]) - 1;
        seatArray[seatIndex] = status;
        // Recuperar los espacios en blanco
        for (let i = 0; i < seatArray.length; i++) {
            if (seatString[i] === ' ') {
                seatArray.splice(i, 0, ' ');
            }
        }
        return seatArray.join('');
    };

    const generateSeatOptions = () => {
        const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        const seats = [];
        let seatIndex = 0;

        if (flight) {
            const seatArray = flight.seats.split('').filter(s => s !== ' ');

            seatArray.forEach((seat, index) => {
                const row = rows[Math.floor(seatIndex / 3)];
                const seatNumber = (seatIndex % 3) + 1;
                if (seat === 'O') {
                    seats.push(`${row}${seatNumber}`);
                }
                seatIndex++;
            });
        }

        return seats;
    };

    useEffect(() => {
        if (booking.flightId.trim() !== "") {
            handleFlightIdBlur();
        }
    }, [booking.flightId]);

    return (
        <div className="airport-container">
            <h2>Booking Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-6 col-lg-3 mb-1">
                        <input
                            type="text"
                            name="passengerId"
                            className="form-control mb-2"
                            placeholder="Passenger Id"
                            value={booking.passengerId}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-6 col-lg-3 mb-1">
                        <input
                            type="text"
                            name="flightId"
                            className="form-control mb-2"
                            placeholder="Flight Id"
                            value={booking.flightId}
                            onBlur={handleFlightIdBlur}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-6 col-lg-3 mb-1">
                        <div className='country p-0'>
                            <select
                                name="seat"
                                className="form-control select-booking"
                                value={booking.seat}
                                onChange={handleInputChange}
                                disabled={!flight}
                            >
                                <option value="">Select Seat</option>
                                {generateSeatOptions().map(seat => (
                                    <option key={seat} value={seat}>
                                        {seat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-6 col-lg-3 mb-2">
                        <div className='country p-0'>
                            <select
                                name="fare"
                                className="form-control select-booking"
                                value={booking.fare}
                                onChange={handleInputChange}>
                                <option value="Basic">Basic</option>
                                <option value="Regular">Regular</option>
                                <option value="Plus">Plus</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <button type="submit" className="btn-p" disabled={!flight}>Add Booking</button>
                    </div>
                    {errorMessage && <p className="error-message my-2">{errorMessage}</p>}
                </div>
            </form>
        </div>
    );
}
