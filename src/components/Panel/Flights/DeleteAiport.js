import React, { useState, useEffect } from 'react';
import countries from '../../../utils/countries';
import countryFlag from '../../../utils/countryFlag';
import FlightsService from '../../../services/FlightsService';
import planeIcon from '../../../assets/images/plane.png';

const DeleteAirport = () => {
    const flightsService = new FlightsService();
    const [country, setCountry] = useState("Spain");
    const [airports, setAirports] = useState([]);
    const [selectedAirport, setSelectedAirport] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchAirportsByCountry(country);
    }, [country]);

    const fetchAirportsByCountry = async (countryName) => {
        try {
            const airports = await flightsService.GetAirportsByCountry(countryName);
            setAirports(airports);
        } catch (error) {
            console.error('Error fetching airports:', error);
        }
    };

    const handleCountryChange = (event) => {
        const selectedCountryName = event.target.value;
        setCountry(selectedCountryName);
    };

    const handleAirportChange = (event) => {
        const selectedAirportId = parseInt(event.target.value);
        if (selectedAirportId) {
            const airport = airports.find(a => a.id === selectedAirportId);
            setSelectedAirport(airport);
            setErrorMessage("");
        } else {
            setSelectedAirport(null);
        }
    };

    const handleDeleteAirport = async () => {
        if (selectedAirport) {
            alert(JSON.stringify(selectedAirport))
            try {
                await flightsService.deleteAirport(selectedAirport.id);
                fetchAirportsByCountry(country);
                setSelectedAirport(null);
                alert("Airport deleted successfully");
            } catch (error) {
                console.error('Error deleting airport:', error);
                setErrorMessage("*Error deleting airport. Please try again.");
            }
        } else {
            setErrorMessage("*No airport selected. Please select an airport to delete.");
        }
    };

    return (
        <div className="delete-airport-container airport-container mt-3">
            <h2>Manage Airports</h2>
            <div className="row">
                <div className="col-6 col-md-12 col-lg-6">
                    <div className='country mb-2'>
                        <img src={`https://flagsapi.com/${countryFlag(country)}/flat/32.png`} alt="Country Flag" />
                        <select onChange={(event) => handleCountryChange(event)} value={country}>
                            {countries.map(country => (
                                <option key={country.iso2} value={country.nameEN}>
                                    {country.nameEN}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-6 col-md-12 col-lg-6">
                    <div className='airport'>
                        <img src={planeIcon} alt='plane icon' />
                        <select onChange={(event) => handleAirportChange(event)} value={selectedAirport?.id || ''}>
                            {airports.length === 0 ? (
                                <option value="">-- Airport not available --</option>
                            ) : airports.map(airport => (
                                <option key={airport.id} value={airport.id}>
                                    {airport.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-12 col-lg-6 my-2">
                    <button onClick={handleDeleteAirport} className="btn-p">Delete Airport</button>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
}

export default DeleteAirport;
