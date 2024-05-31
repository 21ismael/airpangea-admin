import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/svg/logo-white.svg';
import './Header.css';

export default function Header({ openDialog }) {

    return (
        <header>
            <nav className="navbar navbar-expand-lg py-3" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand m-0" href="/">
                        <img src={logo} className="logo" alt="logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-4">
                            <li className="nav-item"><NavLink to='http://localhost:3000/' target="_blank" className="nav-link">WEBSITE</NavLink></li>
                            <li className="nav-item"><NavLink to='/admin-panel/flights' className="nav-link">FLIGHTS MANAGER</NavLink></li>
                            <li className="nav-item"><NavLink to='/admin-panel/users' className="nav-link">USERS MANAGER</NavLink></li>
                            <li className="nav-item"><NavLink to='/admin-panel/booking' className="nav-link">BOOKING MANAGER</NavLink></li>
                            <li className="nav-item"><button id="supportBtn" className="nav-link" onClick={openDialog}>SUPPORT</button></li>
                            <li className="nav-item"><NavLink to='/login' className="nav-link">🢆 LOGOUT</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
