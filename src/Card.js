import React from 'react';
import './Card.css';

function Card({ img }) {
    return (
        <img className="Card" src={img} alt="Playing Card" >
        </img >
    );
}

export default Card;