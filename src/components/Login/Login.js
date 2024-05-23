import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/svg/logo-black.svg';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        if (username === 'admin' && password === 'admin') {
            window.location.href = '/admin-panel/flights';
        } else {
            console.log('Credenciales incorrectas');
        }
    };

    return (
        <div className='login'>
            <form onSubmit={handleLogin}>
                <img src={logo} alt='logo' className='logo'></img>
                <div className='form-inputs'>
                    <input
                        type='text'
                        placeholder='USERNAME'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='PASSWORD'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit' className='btn-p mx-4'>LOGIN</button>
            </form>
        </div>
    );
}
