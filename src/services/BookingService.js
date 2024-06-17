export default class UsersService {
    SERVER = "http://localhost:5081/api";

    async getAllBookings() {
        const response = await fetch(`${this.SERVER}/booking`);

        if (!response.ok) {
            throw new Error('Failed to get all the bookings');
        }

        return response.json();
    }

    async addBooking(booking) {
        try {
            const response = await fetch(`${this.SERVER}/booking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(booking),
            });
            
            if (!response.ok) {
                throw new Error('Failed to add a booking');
            }

            console.log("Booking added successfully");
            const apiResponse = await response.json();

            return apiResponse;
        } catch (error) {
            console.error('Error adding booking:', error);
            throw error;
        }
    }
}