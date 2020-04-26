import React from 'react';
const GrandTotalSticky = ({ grandTotal }) => {
    return (
        <div className="card text-white bg-info text-center">
            <div className='card-header'>GRAND TOTAL</div>
            <div className='card-body'>{grandTotal}</div>
        </div>
    )
}

export default GrandTotalSticky