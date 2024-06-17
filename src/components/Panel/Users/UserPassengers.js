import React, { useState, useEffect } from 'react';
import './Users.css';
import UsersService from '../../../services/UsersService';

export default function UserPassengers({ users, fetchUsers }) {
    const userService = new UsersService();

    const [userId, setUserId] = useState(0);
    const [user, setUser] = useState(null);
    const [passengers, setPassengers] = useState([]);
    const [showAddPassengerForm, setShowAddPassengerForm] = useState(false);
    const [newPassenger, setNewPassenger] = useState({
        userId: 0,
        name: '',
        lastName: '',
        identityNumber: '',
    });

    useEffect(() => {
        setNewPassenger(prevState => ({
            ...prevState,
            userId: userId
        }));
    }, [userId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const foundUser = users.find(u => u.id === userId);
        if (foundUser) {
            setUser(foundUser);
            setPassengers(foundUser.passengers || []);
        } else {
            alert('User not found');
            setUser(null);
            setPassengers([]);
        }
    };

    const handleNewPassengerChange = (event) => {
        const { name, value } = event.target;
        setNewPassenger(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        setUserId(Number(value));
    };

    const handleAddPassenger = async (event) => {
        event.preventDefault();
        try {
            const addedPassenger = await userService.addPassenger(newPassenger);
            setPassengers([...passengers, addedPassenger]);
            fetchUsers();
            setNewPassenger({
                userId: userId,
                name: '',
                lastName: '',
                identityNumber: '',
            });
            setShowAddPassengerForm(false);
        } catch (error) {
            console.error("Error adding passenger: ", error);
        }
    };

    return (
        <div className="airport-container mt-3">
            <h2>User Passengers</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <p className='pb-0'>Enter the ID of the user to whom you want to add a passenger: </p>
                    <div className="col-6">
                        <input
                            type="number"
                            min="0"
                            name="id"
                            className="form-control mb-2"
                            placeholder="User ID"
                            value={userId}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-6">
                        <button type="submit" className='btn-p'>Search</button>
                    </div>
                </div>
            </form>

            {user && (
                <div className='row py-0 m-0 pb-2'>
                    <div className='user-details p-0 table-container corners'>
                        <h2 className='m-0'>User Details</h2>
                        <p className='m-0 px-3 mt-2'><strong>Name:</strong> {user.name} {user.lastName}</p>
                        <p className='m-0 px-3 mb-2'><strong>Email:</strong> {user.email}</p>
                    </div>
                    <div className='passengers-container my-2 p-0'>
                        <div className='table-container corners'>
                            <div className='d-flex justify-content-between align-items-center bg-black'>
                                <h2 className='m-0'>Passengers</h2>
                                <button className='mx-3 btn' onClick={() => setShowAddPassengerForm(!showAddPassengerForm)}>
                                    {showAddPassengerForm ? '- Add Passenger' : '+ Add Passenger'}
                                </button>
                            </div>
                            {/* Form para añadir un pasajero */}
                            {showAddPassengerForm && (
                                <form onSubmit={handleAddPassenger}>
                                    <div className="row m-0 px-0">
                                        <div className="col-4">
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control mb-2"
                                                placeholder="Name"
                                                value={newPassenger.name}
                                                onChange={handleNewPassengerChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-4">
                                            <input
                                                type="text"
                                                name="lastName"
                                                className="form-control mb-2"
                                                placeholder="Last Name"
                                                value={newPassenger.lastName}
                                                onChange={handleNewPassengerChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-4">
                                            <input
                                                type="text"
                                                name="identityNumber"
                                                className="form-control mb-2"
                                                placeholder="Identity Number"
                                                value={newPassenger.identityNumber}
                                                onChange={handleNewPassengerChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className='btn-p'>Add Passenger</button>
                                        </div>
                                    </div>
                                </form>
                            )}

                            {passengers.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Last Name</th>
                                            <th>Identity Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {passengers.map((passenger) => (
                                            <tr key={passenger.id}>
                                                <td>{passenger.id}</td>
                                                <td>{passenger.name}</td>
                                                <td>{passenger.lastName}</td>
                                                <td>{passenger.identityNumber}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className='m-0 py-2 px-3'>No passengers found</p>
                            )}
                        </div>
                    </div>
                </div >
            )}
        </div>
    );
}
