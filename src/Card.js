import React from 'react';
import './Card.css';

function Card({ img, rotation, height }) {
    const styles = {
        transform: rotation,
        margin: height
    }

    return (
        <img className="Card" style={styles} src={img} alt="Playing Card" >
        </img >
    );
}

export default Card;