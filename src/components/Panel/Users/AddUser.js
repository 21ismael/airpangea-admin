import React, { useState, useEffect } from 'react';
import UsersService from '../../../services/UsersService';

export default function AddUser({fetchUsers}) {
    const userService = new UsersService();

    const initialUserState = {
        name: "",
        lastName: "",
        email: "",
        password:"1234"
    };

    const [user, setUser] = useState(initialUserState);

    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (user.name.trim() === "" || user.lastName.trim() === "" || user.email.trim() == "") {
            setErrorMessage("*Error adding user. Please fill in all fields.");
            return;
        }

        try {
            await userService.addUser(user);
            alert(JSON.stringify(user))
            setUser(initialUserState);
            setErrorMessage("");
            fetchUsers();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return <>
        <div className="airport-container">
            <h2>User Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-6 col-md-12 col-lg-6 mb-1">
                        <input type="text" name="name" className="form-control mb-2" placeholder="Name" value={user.name} onChange={handleInputChange} />
                    </div>
                    <div className="col-6 col-md-12 col-lg-6 mb-1">
                        <input type="text" name="lastName" className="form-control mb-2" placeholder="Last Name" value={user.lastName} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-7">
                        <input type="email" name="email" className="form-control mb-2" placeholder="Email" value={user.email} onChange={handleInputChange} />
                    </div>
                    <div className="col-12 col-md-5">
                        <button type="submit" className="btn-p">Add User</button>
                    </div>
                    {errorMessage && <p className="error-message my-2">{errorMessage}</p>}
                </div>
            </form>
        </div>
    </>
}
