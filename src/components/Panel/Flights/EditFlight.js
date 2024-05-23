import React, { useState } from 'react';
import FlightsService from '../../../services/FlightsService';

export default function EditFlight({ flightToEdit, fetchFlights,  handleCloseDialog }) {
    const [selectedStatus, setSelectedStatus] = useState(flightToEdit.status);
    const [errorMessage, setErrorMessage] = useState("");
    const flightsService = new FlightsService();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await flightsService.updateFlight({ ...flightToEdit, status: selectedStatus });
            handleCloseDialog();
            fetchFlights();
        } catch (error) {
            console.error('Error updating flight status:', error);
            setErrorMessage("An error occurred while updating the flight status. Please try again.");
        }
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Change status to: </label>
                    <select value={selectedStatus} onChange={handleStatusChange} className='mx-2'>
                        {["Scheduled", "En route", "Delayed", "Cancelled", "Completed"].map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
                <div className='button-container d-flex gap-1'>
                    <button type="submit" className='btn-p mt-2'>Save</button>
                    <button onClick={handleCloseDialog} className="btn-cancel mt-2">Cancel</button>
                </div>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </>
    );
}
