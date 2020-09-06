import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card'
// import './CardPile.css';

function CardPile() {
    const deckId = useRef();
    const [remaining, setRemaining] = useState(52);
    const [cards, setCards] = useState([]);
    useEffect(() => {
        async function getNewDeck() {
            const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/');
            deckId.current = res.data.deck_id;
        }
        getNewDeck()
    }, [])

    const drawCard = async () => {
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId.current}/draw/`);
        setCards(res.data.cards)
        setRemaining(res.data.remaining)
    }

    return (
        <div className="CardPile">
            <h3>Cards Remaining In Deck: {remaining ? remaining : alert('Error: no cards remaining!')}</h3>
            <button onClick={drawCard}>Draw a Card</button>
            <div className="Card">
                {cards.map(card => (
                    <Card img={card.image} />
                ))}
            </div>
        </div>
    );
}

export default CardPile;