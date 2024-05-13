import React, { useState, useEffect } from 'react';
import './Flights.css';
import countries from '../../../utils/countries';
import FlightsService from '../../../services/FlightsService';
import planeIcon from '../../../assets/images/plane.png';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import formattedDate from '../../../utils/formattedDate';

export default function AddFlight({ fetchFlights }) {

    const flightsService = new FlightsService();

    const [flights, setFlights] = useState([]);
    const [flight, setFlight] = useState({
        seats: "0000000000000",
        price: "",
        status: "Scheduled",
        departureDateTime: new Date().toISOString(),
        arrivalDateTime: (() => {
            const nextDay = new Date();
            nextDay.setDate(nextDay.getDate() + 1);
            return nextDay.toISOString();
        })(),
        aircraftId: 1,
        airportDepartureId: null,
        airportArrivalId: null
    });

    const [departureCountry, setDepartureCountry] = useState({});
    const [departureAirport, setDepartureAirport] = useState({});
    const [departureAirports, setDepartureAirports] = useState([]);

    const [arrivalCountry, setArrivalCountry] = useState({});
    const [arrivalAirport, setArrivalAirport] = useState({});
    const [arrivalAirports, setArrivalAirports] = useState([]);

    const [departureDateTime, setDepartureDateTime] = useState(new Date());
    const [arrivalDateTime, setArrivalDateTime] = useState(() => {
        const nextDay = new Date(departureDateTime);
        nextDay.setDate(nextDay.getDate() + 1);
        return nextDay;
    });

    const handleDateTimeChange = (newDateTime, type) => {
        if (type === 'departure') {
            setDepartureDateTime(newDateTime);
            const newDepartureDateTime = new Date(newDateTime);
            newDepartureDateTime.setHours(newDepartureDateTime.getHours() + 2);
    
            setFlight(prevFlight => ({
                ...prevFlight,
                departureDateTime: newDepartureDateTime.toISOString()
            }));
    
            // If arrival datetime is before departure datetime, adjust it to departure datetime + 1 day
            if (arrivalDateTime < newDepartureDateTime) {
                const newMinArrivalDateTime = new Date(newDepartureDateTime);
                newMinArrivalDateTime.setDate(newMinArrivalDateTime.getDate() + 1);
                setArrivalDateTime(newMinArrivalDateTime);
                setFlight(prevFlight => ({
                    ...prevFlight,
                    arrivalDateTime: newMinArrivalDateTime.toISOString()
                }));
            }
        } else if (type === 'arrival') {
            setArrivalDateTime(newDateTime);
            const newArrivalDateTime = new Date(newDateTime);
            newArrivalDateTime.setHours(newArrivalDateTime.getHours() + 2);
    
            setFlight(prevFlight => ({
                ...prevFlight,
                arrivalDateTime: newArrivalDateTime.toISOString()
            }));
        }
    };
    
    useEffect(() => {
        const selectedCountry = countries.find(country => country.nameEN === 'Spain');
        if (selectedCountry) {
            setDepartureCountry(selectedCountry);
            setArrivalCountry(selectedCountry);
            fetchAirportsByName('Spain', 'departure');
            fetchAirportsByName('Spain', 'arrival');
        }
    }, []);

    const setFirstAirport = (airports, type) => {
        if (airports.length > 0) {
            const firstAirportId = airports[0].id;
            if (type === 'departure') {
                setDepartureAirport(airports[0]);
                setFlight(prevFlight => ({
                    ...prevFlight,
                    airportDepartureId: firstAirportId
                }));
            } else if (type === 'arrival' && airports.length > 1) {
                // Set the arrival airport to the second airport in the list
                setArrivalAirport(airports[1]);
                setFlight(prevFlight => ({
                    ...prevFlight,
                    airportArrivalId: airports[1].id // Use the ID of the second airport
                }));
            }
        }
    };

    const fetchAirportsByName = async (country, type) => {
        try {
            const airports = await flightsService.GetAirportsByCountry(country);
            if (type === 'departure') {
                setDepartureAirports(airports);
                setFirstAirport(airports, 'departure');
            } else if (type === 'arrival') {
                setArrivalAirports(airports);
                setFirstAirport(airports, 'arrival');
            }
        } catch (error) {
            console.error(`Error fetching Airports of ${country}:`, error);
        }
    };

    const handleCountryChange = (event, type) => {
        const selectedCountryName = event.target.value;
        const selectedCountry = countries.find(country => country.nameEN === selectedCountryName);
        if (selectedCountry) {
            if (type === 'departure') {
                setDepartureCountry(selectedCountry);
                fetchAirportsByName(selectedCountry.nameEN, 'departure');
            } else if (type === 'arrival') {
                setArrivalCountry(selectedCountry);
                fetchAirportsByName(selectedCountry.nameEN, 'arrival');
            }
        }
    };

    const handleAirportChange = (event, type) => {
        const selectedAirportId = parseInt(event.target.value);
        const selectedAirport = (type === 'departure' ? departureAirports : arrivalAirports).find(airport => airport.id === selectedAirportId);
        if (selectedAirport) {
            if (type === 'departure') {
                setDepartureAirport(selectedAirport);
                setFlight(prevFlight => ({
                    ...prevFlight,
                    airportDepartureId: selectedAirportId
                }));
            } else if (type === 'arrival') {
                setArrivalAirport(selectedAirport);
                setFlight(prevFlight => ({
                    ...prevFlight,
                    airportArrivalId: selectedAirportId
                }));
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await flightsService.addFlight(flight);
            fetchFlights();
            alert(JSON.stringify(flight));
        } catch (error) {
            console.error('Error adding flight:', error);
        }
    };

    return <>
        <div className="flight-container mt-3">
            <h2 className="m-0">Flight Information</h2>
            <div className="flight-content d-flex flex-column gap-2">

                <form onSubmit={handleSubmit}>

                    <div className="date-container">
                        <div className="row">
                            <div className="departure-date col-12 col-sm-6 col-md-12 col-lg-6 mb-2">
                                <label>Date of Departure</label>
                                <Datetime
                                    value={departureDateTime}
                                    dateFormat="DD-MM-YYYY"
                                    timeFormat="HH:mm A"
                                    onChange={(newDateTime) => handleDateTimeChange(newDateTime, 'departure')}
                                    className="custom-datetime"
                                    inputProps={{ readOnly: true }}
                                    isValidDate={(currentDate) => {
                                        // currentDate: Fecha actual que se está evaluando
                                        const now = new Date(); // Obtiene la fecha y hora actual
                                        // Devuelve true si la fecha actual es posterior o igual a la fecha actual
                                        return currentDate.isAfter(now, 'day') || currentDate.isSame(now, 'day');
                                    }}
                                />
                            </div>
                            <div className="arrival-date col-12 col-sm-6 col-md-12 col-lg-6">
                                <label>Date of Arrival</label>
                                <Datetime
                                    value={arrivalDateTime}
                                    dateFormat="DD-MM-YYYY"
                                    timeFormat="HH:mm A"
                                    onChange={(newDateTime) => handleDateTimeChange(newDateTime, 'arrival')}
                                    className="custom-datetime"
                                    inputProps={{ readOnly: true }}
                                    isValidDate={(currentDate) => {
                                        // currentDate: Fecha actual que se está evaluando
                                        const now = new Date(); // Obtiene la fecha y hora actual
                                        const departureDate = new Date(departureDateTime); // Obtiene la fecha de salida

                                        // Devuelve true si la fecha actual es posterior o igual a la fecha de salida
                                        return currentDate.isSameOrAfter(departureDate, 'day') || currentDate.isSameOrAfter(now, 'day');
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="departure-container">
                        <label>Departure Information</label>
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-12 col-lg-6">
                                <div className='country mb-2'>
                                    <img src={`https://flagsapi.com/${departureCountry?.iso2 || "ES"}/flat/32.png`} alt="Country Flag" />
                                    <select onChange={(event) => handleCountryChange(event, 'departure')}>
                                        {countries.map(country => (
                                            <option key={country.iso2} value={country.nameEN}>
                                                {country.nameEN}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-12 col-lg-6">
                                <div className='airport'>
                                    <img src={planeIcon} alt='plane icon' />
                                    <select onChange={(event) => handleAirportChange(event, 'departure')}>
                                        {departureAirports.length === 0 && (
                                            <option value="not-available">-- Airport not available --</option>
                                        )}
                                        {departureAirports.map(airport => (
                                            <option key={airport.id} value={airport.id}>
                                                {airport.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="arrival-container">
                        <label>Arrival Information</label>
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-12 col-lg-6">
                                <div className='country mb-2'>
                                    <img src={`https://flagsapi.com/${arrivalCountry?.iso2 || "ES"}/flat/32.png`} alt="Country Flag" />
                                    <select onChange={(event) => handleCountryChange(event, 'arrival')}>
                                        {countries.map(country => (
                                            <option key={country.iso2} value={country.nameEN}>
                                                {country.nameEN}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-12 col-lg-6">
                                <div className='airport'>
                                    <img src={planeIcon} alt='plane icon' />
                                    <select onChange={(event) => handleAirportChange(event, 'arrival')}>
                                        {arrivalAirports.length === 0 && (
                                            <option value="not-available">-- Airport not available --</option>
                                        )}
                                        {arrivalAirports.filter(airport => airport.id !== departureAirport.id).map((airport, index) => (
                                            <option key={airport.id} value={airport.id}>
                                                {airport.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="price-btn-container">
                        <div className="row">
                            <div className="price-container col-6">
                                <label>Price</label>
                                <input
                                    type="number"
                                    step={0.1}
                                    min={0}
                                    className="form-control mb-2"
                                    placeholder="39.9€"
                                    value={flight.price}
                                    onChange={(event) => {
                                        const newValue = event.target.value;
                                        setFlight(prevFlight => ({
                                            ...prevFlight,
                                            price: newValue
                                        }));
                                    }}
                                />
                            </div>

                            <div className="btn-container col-6 d-flex align-items-end justify-content-center">
                                <button className="btn-p">Add Flight</button>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </>
}
