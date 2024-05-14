export default class UsersService {
    SERVER = "http://localhost:5081/api";

    async getAllUsers() {
        const response = await fetch(`${this.SERVER}/user`);

        if (!response.ok) {
            throw new Error('Failed to get all the users');
        }

        return response.json();
    }

    async addUser(user) {
        try {
            const response = await fetch(`${this.SERVER}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            
            if (!response.ok) {
                throw new Error('Failed to add a user');
            }

            console.log("User added successfully");
            const apiResponse = await response.json();

            return apiResponse;
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    }

    async addPassenger(passenger) {
        try {
            const response = await fetch(`${this.SERVER}/passenger`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(passenger),
            });
            
            if (!response.ok) {
                throw new Error('Failed to add a passenger');
            }

            console.log("Passenger added successfully");
            const apiResponse = await response.json();

            return apiResponse;
        } catch (error) {
            console.error('Error adding passenger:', error);
            throw error;
        }
    }
}