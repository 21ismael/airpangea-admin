import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/svg/logo-white.svg';
//import nav from '../../../utils/nav';
import './Header.css';

export default function Header() {
    return <>
        <header className="">
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
                            <li className="nav-item">
                                <a className="nav-link" href="#">FLIGHT MANAGER</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">SUPPORT</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">🢆 LOGOUT</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    </>
}
