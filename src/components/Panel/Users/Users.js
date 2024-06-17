import React, { useState, useEffect } from 'react';
import UsersService from '../../../services/UsersService';
import AddUser from './AddUser';
import UserPassengers from './UserPassengers';

export default function Users() {

    const userService = new UsersService();

    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filterId, setFilterId] = useState('');
    const [filterEmail, setFilterEmail] = useState('');

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const fetchUsers = async () => {
        try {
            const users = await userService.getAllUsers();
            setUsers(users);
            setFilteredUsers(users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [filterId, filterEmail, users]);

    const filterUsers = () => {
        let filtered = users;

        if (filterId) {
            filtered = filtered.filter(user => user.id.toString().includes(filterId));
        }

        if (filterEmail) {
            filtered = filtered.filter(user => user.email.toLowerCase().includes(filterEmail.toLowerCase()));
        }

        setFilteredUsers(filtered);
    };

    const handleOpenDialog = (user) => {
        setUserToDelete(user);
        setIsDeleteDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDeleteDialogOpen(false);
        setUserToDelete(null);
    };

    const handleDeleteUser = async () => {
        try {
            await userService.deleteUser(userToDelete.id);
            fetchUsers();
            handleCloseDialog();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

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
                    <div className='input-container d-flex align-items-center'>
                        <label>Filter by User Id</label>
                        <input
                            type="text"
                            className="form-control input-filter"
                            placeholder='ID'
                            value={filterId}
                            onChange={(e) => setFilterId(e.target.value)}
                        />
                        <label className='mx-3'>Filter by Email</label>
                        <input
                            type='text'
                            className="form-control input-filter input-email"
                            placeholder='user@email.com'
                            value={filterEmail}
                            onChange={(e) => setFilterEmail(e.target.value)}
                        />
                    </div>
                    <div className='table-container'>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>LastName</th>
                                    <th>Email</th>
                                    <th>Nº Passengers</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.passengers.length}</td>
                                        <td>
                                            <button onClick={() => handleOpenDialog(user)} className="btn">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        {/* Delete User Dialog */}
        {isDeleteDialogOpen && (
            <div className="dialog-overlay">
                <div className="dialog">
                    <h3>Delete User</h3>
                    <p>Are you sure you want to delete this user?</p>
                    <div className="dialog-buttons">
                        <button onClick={handleDeleteUser} className="btn bg-red">Delete</button>
                        <button onClick={handleCloseDialog} className="btn btn-secondary mx-3">Cancel</button>
                    </div>
                </div>
            </div>
        )}
    </>
}
