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

    const [showDialog, setShowDialog] = useState(false);

    const openDialog = () => {
        setShowDialog(true);
    };

    const closeDialog = () => {
        setShowDialog(false);
    };

    return (
        <>
            <div className="loader">
                <img src={loader} alt='loader' />
            </div>

            <Header openDialog={openDialog} />
            <main>
                <Outlet />
            </main>

            {showDialog && (
                <div className="dialog-overlay">
                    <div className="dialog">
                        <p>Contact Information for Support:</p>
                        <p>If you require assistance, please contact our support team.</p>
                        <p>Email: <span className="support-info">support@airpangea.com</span></p>
                        <p>Phone: <span className="support-info">+34 655-123-489</span></p>
                        <p className='mb-3'>Our support team is available Monday to Friday, from 9:00 AM to 5:00 PM (EST).</p>
                        <button onClick={closeDialog} className='btn-p'>Close</button>
                    </div>
                </div>
            )}

        </>
    );
}