import React from 'react';
import './SeatMapPlane.css';

export default function SeatMapPlane({ seats }) {
    const renderSeatMap = (seatLayout) => {
        return seatLayout.split('').map((seatType, index) => {
            let seatClass = 'seat';

            if (seatType === 'X') {
                seatClass += ' unavailable';
            } else if (seatType === 'O') {
                seatClass += ' available';
            } else {
                seatClass += ' hall';
            }

            return <div key={index} className={seatClass}></div>;
        });
    };

    return (
        <div className="seatmap-container">
            {renderSeatMap(seats)}
        </div>
    );
}
