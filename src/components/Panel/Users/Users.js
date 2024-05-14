import React, { useState, useEffect } from 'react';
import UsersService from '../../../services/UsersService';
import AddUser from './AddUser';
import UserPassengers from './UserPassengers';

export default function Users() {

    const userService = new UsersService();

    const [users, setUsers] = useState([]);
    
    const fetchUsers = async () => {
        try {
            const users = await userService.getAllUsers();
            setUsers(users);
            console.log(users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    
    return <>
        <div className="container-fluid my-5">
            <div className="row">

                {/* CREAR USUARIO */}

                <div className="col-md-5 mb-3">
                    <AddUser fetchUsers={fetchUsers} />

                    <UserPassengers users={users} fetchUsers={fetchUsers} />
                </div>

                {/* -- TABLA DE USUARIOS -- */}

                <div className="col-md-7">
                    <div className='table-container'>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>LastName</th>
                                    <th>Email</th>
                                    <th>Nº Passengers</th>
                                </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.passengers.length}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
}
