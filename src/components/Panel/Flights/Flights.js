import React, { useState, useEffect } from 'react';
import './Flights.css';
import FlightsService from '../../../services/FlightsService';
import formattedDate from '../../../utils/formattedDate';
import AddAirport from './AddAirport';
import AddFlight from './AddFlight';
import countryFlag from '../../../utils/countryFlag';
import convertToAP from '../../../utils/convertToAP';
import DeleteAirport from './DeleteAiport';
import EditFlight from './EditFlight';

export default function Flights() {

    const flightsService = new FlightsService();

    const [filterId, setFilterId] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const handleFilterIdChange = (event) => {
        setFilterId(event.target.value);
    };

    const handleFilterStatusChange = (event) => {
        setFilterStatus(event.target.value);
    };

    const [flights, setFlights] = useState([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [flightToDelete, setFlightToDelete] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [flightToEdit, setFlightToEdit] = useState(false);

    const fetchFlights = async () => {
        try {
            const flights = await flightsService.getAllFlights();
            setFlights(flights);
            console.log(flights);
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    };

    useEffect(() => {
        fetchFlights();
    }, []);

    const filteredFlights = flights.filter(flight =>
        convertToAP(flight.id.toString()).includes(filterId.toString()) &&
        (filterStatus === '' || flight.status === filterStatus)
    );

    const handleOpenDialog = (flight, action) => {
        if (action === 'delete') {
            setFlightToDelete(flight);
            setIsDeleteDialogOpen(true);
        } else if (action === 'edit') {
            setIsEditDialogOpen(true);
            setFlightToEdit(flight);
            alert(JSON.stringify(flight));
        }
    };

    const handleCloseDialog = () => {
        setFlightToDelete(null);
        setIsDeleteDialogOpen(false);
        setIsEditDialogOpen(false);
    };

    const handleDeleteFlight = async () => {
        try {
            await flightsService.deleteFlight(flightToDelete.id);
            fetchFlights();
            handleCloseDialog();
        } catch (error) {
            console.error('Error deleting flight:', error);
        }
    };

    return (
        <div className="container-fluid my-5">
            <div className="row">

                {/* CREAR AEROPUETO Y VUELO */}

                <div className="col-md-5 mb-3">
                    <AddFlight fetchFlights={fetchFlights} />

                    <AddAirport />

                    <DeleteAirport />
                </div>

                {/* -- TABLA DE VUELOS -- */}

                <div className="col-md-7">
                    <div className='input-container d-flex align-items-center'>
                        <label>Filter by Flight Code</label>
                        <input
                            type="text"
                            placeholder="AP000"
                            value={filterId}
                            onChange={handleFilterIdChange}
                            className="form-control input-filter"
                        />
                        <label className='mx-3'>Filter by Status</label>
                        <select value={filterStatus} onChange={handleFilterStatusChange} className="form-control form-select">
                            <option value=''>All</option>
                            <option value='Scheduled'>Scheduled</option>
                            <option value='Delayed'>Delayed</option>
                            <option value='Cancelled'>Cancelled</option>
                            <option value='Completed'>Completed</option>
                        </select>
                    </div>

                    <div className='table-container'>
                        <table>
                            <thead>
                                <tr>
                                    <th>F. Code</th>
                                    <th>Bs. Price</th>
                                    <th>Status</th>
                                    <th>ETD</th>
                                    <th>ETA</th>
                                    <th>Dept. City</th>
                                    <th>Arrv. City</th>
                                    <th>Delete</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFlights.map((flight) => (
                                    <tr key={flight.id}>
                                        <td>{convertToAP(flight.id)}</td>
                                        <td>{flight.price}€</td>
                                        <td>{flight.status}</td>
                                        <td>{formattedDate(flight.departureDateTime)}</td>
                                        <td>{formattedDate(flight.arrivalDateTime)}</td>
                                        <td>
                                            <img src={`https://flagsapi.com/${countryFlag(flight.airportDeparture.country)}/flat/24.png`} alt="Departure Flag" />
                                            {flight.airportDeparture.city}
                                        </td>
                                        <td>
                                            <img src={`https://flagsapi.com/${countryFlag(flight.airportArrival.country)}/flat/24.png`} alt="Arrival Flag" />
                                            {flight.airportArrival.city}
                                        </td>
                                        <td>
                                            <button onClick={() => handleOpenDialog(flight, 'delete')} className="btn">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                </svg>
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleOpenDialog(flight, 'edit')} className="btn">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* -- DIALOGS -- */}

            {/* Delete Dialog */}
            {isDeleteDialogOpen && (
                <div className="dialog-overlay">
                    <div className="dialog">
                        <h3>Delete Flight</h3>
                        <p>Are you sure you want to delete this flight?</p>
                        <div className="dialog-buttons">
                            <button onClick={handleDeleteFlight} className="btn bg-red">Delete</button>
                            <button onClick={handleCloseDialog} className="btn btn-secondary mx-3">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Dialog */}
            {isEditDialogOpen && (
                <div className="dialog-overlay">
                    <div className="dialog">
                        <EditFlight flightToEdit={flightToEdit} handleCloseDialog={handleCloseDialog} fetchFlights={fetchFlights} />
                    </div>
                </div>
            )}
        </div>
    );
}
