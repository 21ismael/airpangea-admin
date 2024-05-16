import React from 'react';
import AddBooking from './AddBooking';
import SeatMap from './SeatMap';

export default function booking() {
  return <>
    <div className="container-fluid my-5">
      <div className="row">

        {/* CREAR USUARIO */}

        <div className="col-md-5 mb-3">
          <SeatMap />
        </div>

        {/* -- TABLA DE USUARIOS -- */}

        <div className="col-md-7">
          <AddBooking />
        </div>
      </div>
    </div>
  </>
}
