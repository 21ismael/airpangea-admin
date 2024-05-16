export default class FlightsService {
    SERVER = "http://localhost:5081/api";

    async getAllFlights() {
        const response = await fetch(`${this.SERVER}/flight`);

        if (!response.ok) {
            throw new Error('Failed to get all the flights');
        }

        return response.json();
    }

    async getFlightById(id) {
        try {
            const response = await fetch(`${this.SERVER}/flight/${id}`);

            if (!response.ok) {
                throw new Error(`Failed to get flight with id ${id}`);
            }

            return response.json();
        } catch (error) {
            console.error('Error getting flight by id:', error);
            throw error;
        }
    }

    async GetAirportsByCountry(country) {
        const response = await fetch(`${this.SERVER}/airport/by-country-name/${country}`);

        if (!response.ok) {
            throw new Error('Failed to get all the airports from ' + country);
        }

        return response.json();
    }

    async addAirport(airport) {
        try {
            const response = await fetch(`${this.SERVER}/airport`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(airport),
            });

            if (!response.ok) {
                throw new Error('Failed to add a airport');
            }

            console.log("Airport added successfully");
            const apiResponse = await response.json();

            return apiResponse;
        } catch (error) {
            console.error('Error adding airport:', error);
            throw error;
        }
    }

    async addFlight(flight) {
        try {
            const response = await fetch(`${this.SERVER}/flight`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(flight),
            });

            if (!response.ok) {
                throw new Error('Failed to add a flight');
            }

            console.log("Flight added successfully");
            const apiResponse = await response.json();

            return apiResponse;
        } catch (error) {
            console.error('Error adding flight:', error);
            throw error;
        }
    }

}