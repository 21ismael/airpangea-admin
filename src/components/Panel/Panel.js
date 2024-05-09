import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import './Panel.css';
import loader from '../../assets/svg/loader.svg'

export default function Root() {

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const loaderElement = document.querySelector(".loader");
            if (loaderElement) {
                loaderElement.classList.add("loader-hidden");
            }
        }, 2000);
    
        // Limpia el temporizador cuando el componente se desmonta
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            <div className="loader">
                <img src={loader} alt='loader' />
            </div>

            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
}