import React, { useState } from 'react';
import countries from '../../../utils/countries';
import countryFlag from '../../../utils/countryFlag';
import FlightsService from '../../../services/FlightsService';

export default function AddAirport() {
    const flightsService = new FlightsService();

    const initialAirportState = {
        iata: "",
        name: "",
        city: "",
        country: "Spain"
    };

    const [airport, setAirport] = useState(initialAirportState);
    const [country, setCountry] = useState("Spain");

    const [error, setError] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if there's an error in the city and airport name fields
        if (airport.city.trim() === "" || airport.name.trim() === "" || airport.iata.trim() == "" || airport.iata.length !== 3) {
            setErrorMessage("*Error adding airport. Please fill in all fields.");
            return;
        }

        try {
            await flightsService.addAirport(airport);
            alert(JSON.stringify(airport));
            setAirport(initialAirportState);
            setCountry("Spain");
            setErrorMessage("");
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage("*Error adding airport. Please try again.");
        }
    };

    const handleAirportChange = (event) => {
        const { name, value } = event.target;

        if (name === 'name') {
            if (value.length === 0) {
                setErrorMessage("*The airport name can't be empty.");
                setError(true);
            } else {
                setError(false);
                setErrorMessage("");
            }
        }

        if (name === 'city') {
            if (value.length === 0) {
                setErrorMessage("*The city name can't be empty.");
                setError(true);
            } else {
                setError(false);
                setErrorMessage("");
            }
        }

        if (name === 'iata') {
            const upperCaseIata = value.toUpperCase();
            if (!/^[A-Z]+$/.test(upperCaseIata) || upperCaseIata.length !== 3) {
                setErrorMessage("*The IATA code must be a 3-character alphabetical string.");
                setError(true);

                if(value.length == 0) {
                    setError(true);
                    setErrorMessage(""); 
                }
            } else {
                setError(false);
                setErrorMessage("");
            }

            setAirport(prevAirportForm => ({
                ...prevAirportForm,
                iata: upperCaseIata
            }));
        } else {
            setAirport(prevAirportForm => ({
                ...prevAirportForm,
                [name]: value
            }));
        }
    };

    const handleCountryChange = (event) => {
        const selectedCountryIso2 = event.target.value;
        setCountry(selectedCountryIso2);
        handleAirportChange(event);
    };

    return (
        <div className="airport-container">
            <h2>Airport Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-6 col-md-12 col-lg-6">
                        <div className='country mb-2'>
                            <img src={`https://flagsapi.com/${countryFlag(country)}/flat/32.png`} alt="Country Flag" />
                            <select name="country" onChange={handleCountryChange} value={airport.country}>
                                {countries.map(country => (
                                    <option key={country.iso2} value={country.name}>
                                        {country.nameEN}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-6 col-md-12 col-lg-6">
                        <input type="text" name="city" className="form-control mb-2" placeholder="City Name" onChange={handleAirportChange} value={airport.city} />
                    </div>
                    <div className="col-9 col-md-12 col-lg-9">
                        <input type="text" name="name" className="form-control mb-2" placeholder="Airport Name" onChange={handleAirportChange} value={airport.name} />
                    </div>
                    <div className="col-3 col-md-12 col-lg-3">
                        <input type="text" name="iata" className="form-control mb-2" placeholder="IATA" onChange={handleAirportChange} value={airport.iata.toLocaleUpperCase()} />
                    </div>
                    <div className="col-12 col-sm-6 col-md-12 col-lg-6 my-2">
                        <button type="submit" className="btn-p">Add Airport</button>
                    </div>
                    <p className='m-0'>Access this website for accurate information: <a href='https://www.airportdata.com/' target='_blank'>www.airportdata.com</a></p>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            </form>
        </div>
    );
}
