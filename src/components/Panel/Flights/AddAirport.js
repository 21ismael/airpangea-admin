import React, { useState } from 'react';
import countries from '../../../utils/countries';
import countryFlag from '../../../utils/countryFlag';

export default function AddAirport() {

    const [airport, setAirport] = useState({
        iata: "",
        name: "",
        city: "",
        country: ""
    });

    const [country, setCountry] = useState("Spain");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            alert(JSON.stringify(airport)); 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAirportChange = (event) => {
        const { name, value } = event.target;
        setAirport(prevAirportForm => ({
            ...prevAirportForm,
            [name]: value
        }));
    };

    const handleCountryChange = (event) => {
        const selectedCountryIso2 = event.target.value;
        setCountry(selectedCountryIso2);
        handleAirportChange(event);
    };

    return <>
        <div className="airport-container">
            <h2>Airport Information</h2>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="row">
                    <div className="col-6 col-md-12 col-lg-6">
                        <div className='country mb-2'>
                            <img src={`https://flagsapi.com/${countryFlag(country)}/flat/32.png`} alt="Country Flag" />
                            <select name="country" onChange={(event) => handleCountryChange(event)} value={airport.country}>
                                {countries.map(country => (
                                    <option key={country.iso2} value={country.name}>
                                        {country.nameEN}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-6 col-md-12 col-lg-6">
                        <input type="text" name="city" className="form-control mb-2" placeholder="City Name" onChange={(event) => handleAirportChange(event)} value={airport.city} />
                    </div>
                    <div className="col-9 col-md-12 col-lg-9">
                        <input type="text" name="name" className="form-control mb-2" placeholder="Airport Name" onChange={(event) => handleAirportChange(event)} value={airport.name} />
                    </div>
                    <div className="col-3 col-md-12 col-lg-3">
                        <input type="text" name="iata" className="form-control mb-2" placeholder="IATA" onChange={(event) => handleAirportChange(event)} value={airport.iata} />
                    </div>
                    <div className="col-12 col-sm-6 col-md-12 col-lg-6 my-2">
                        <button type="submit" className="btn-p">Add Airport</button>
                    </div>
                    <p className='m-0'>Access this website for accurate information: <a href='https://www.airportdata.com/' target='_blank'>www.airportdata.com</a></p>
                </div>
            </form>
        </div>
    </>
}
