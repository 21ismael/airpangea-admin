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

    async deleteUser(userId) {
        try {
            const response = await fetch(`${this.SERVER}/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete user');
            }

            console.log("User deleted successfully");
            return response.json();
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    async updateUser(user) {
        try {
            const response = await fetch(`${this.SERVER}/user/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            console.log("User updated successfully");
            const apiResponse = await response.json();

            return apiResponse;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }
}