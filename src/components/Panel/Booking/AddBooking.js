import React, {useState, useEffect} from 'react';
import BookingService from '../../../services/BookingService';

export default function AddBooking() {
    const bookingService = new BookingService();

    const initialBookingState = {
        passengerId: "",
        flightId: "",
        fare: "",
        seat:""
    };

    const [booking, setBooking] = useState(initialBookingState);

    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBooking({ ...booking, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await bookingService.addBooking(booking);
            alert(JSON.stringify(booking))
            setBooking(initialBookingState);
            setErrorMessage("");
        } catch (error) {
            console.error('Error adding booking:', error);
        }
    };

    return <>
        <div className="airport-container">
            <h2>Booking Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-6 col-md-12 col-lg-6 mb-1">
                        <input type="text" name="passengerId" className="form-control mb-2" placeholder="Passeger Id" value={booking.passengerId} onChange={handleInputChange} />
                    </div>
                    <div className="col-6 col-md-12 col-lg-6 mb-1">
                        <input type="text" name="flightId" className="form-control mb-2" placeholder="Flight Id" value={booking.flightId} onChange={handleInputChange} />
                    </div>
                    <div className="col-6 col-md-12 col-lg-6 mb-1">
                        <input type="text" name="seat" className="form-control mb-2" placeholder="Seat" value={booking.seat} onChange={handleInputChange} />
                    </div>
                    <div className="col-6 col-md-12 col-lg-6 mb-1">
                        <input type="text" name="fare" className="form-control mb-2" placeholder="Fare" value={booking.fare} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-6">
                        <button type="submit" className="btn-p">Add Booking</button>
                    </div>
                    {errorMessage && <p className="error-message my-2">{errorMessage}</p>}
                </div>
            </form>
        </div>
    </>
}
