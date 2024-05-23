import React, { useState } from 'react';
import FlightsService from '../../../services/FlightsService';
import SeatMapPlane from './SeatMapPlane';

export default function SeatMap() {
    const flightService = new FlightsService();

    const [flightId, setFlightId] = useState("");
    const [seats, setSeats] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (flightId.trim() === "") {
            setErrorMessage("*Error searching seatmap. Please fill in the flight id.");
            return;
        } else if (!/^\d+$/.test(flightId.trim())) {
            setErrorMessage("*Error searching seatmap. Flight id must contain only numbers.");
            return;
        }

        try {
            const flight = await flightService.getFlightById(flightId);
            alert(JSON.stringify(flight))
            setSeats(flight.seats);
            setErrorMessage("");
        } catch (error) {
            console.error('Error getting flight:', error);
            setSeats("");
            setErrorMessage(`Error getting flight: ${error.message}`);
        }
    };

    const handleInputChange = (event) => {
        setFlightId(event.target.value);
    };

    return (
        <div className="airport-container mb-3 seatmap">
            <h2>Flight Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-5">
                        <input
                            type="number"
                            min="0"
                            name="flightId"
                            className="form-control mb-2"
                            placeholder="Flight Id"
                            value={flightId}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-7">
                        <button type="submit" className="btn-p">Search</button>
                    </div>
                    {errorMessage && <p className="error-message my-2">{errorMessage}</p>}
                </div>
            </form>

            {seats && (
                <>
                    <SeatMapPlane seats={seats} />
                </>
            )}
        </div>
    );
}