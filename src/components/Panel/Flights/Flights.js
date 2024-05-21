import React, { useState, useEffect } from 'react';
import './Flights.css';
import FlightsService from '../../../services/FlightsService';
import formattedDate from '../../../utils/formattedDate';
import AddAirport from './AddAirport';
import AddFlight from './AddFlight';
import countryFlag from '../../../utils/countryFlag';
import convertToAP from '../../../utils/convertToAP';
import DeleteAirport from './DeleteAiport';

export default function Flights() {

    const flightsService = new FlightsService();

    const [filterId, setFilterId] = useState('');

    const handleFilterChange = (event) => {
        setFilterId(event.target.value);
    };

    const [flights, setFlights] = useState([]);

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
        convertToAP(flight.id.toString()).includes(filterId.toString())
    );

    return <>
        <div className="container-fluid my-5">
            <div className="row">

                {/* CREAR AEROPUETO Y VUELO */}

                <div className="col-md-5 mb-3">

                    <AddAirport />

                    <DeleteAirport />

                    <AddFlight fetchFlights={fetchFlights} />

                </div>

                {/* -- TABLA DE VUELOS -- */}

                <div className="col-md-7">

                    <div className='table-container filter-container'>
                        <input
                            type="text"
                            placeholder="Filter by Flight ID"
                            value={filterId}
                            onChange={handleFilterChange}
                            className="form-control input-filter"
                        />
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
                                        <td><img src={`https://flagsapi.com/${countryFlag(flight.airportDeparture.country)}/flat/24.png`} /> {flight.airportDeparture.city} </td>
                                        <td><img src={`https://flagsapi.com/${countryFlag(flight.airportArrival.country)}/flat/24.png`} /> {flight.airportArrival.city}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
}