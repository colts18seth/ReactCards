import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Card from './Card'
import './CardPile.css';

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

    const cardRotation = () => {
        const randNum = (Math.random() * 80) - 40;
        return ` rotate(${randNum}deg)`
    }

    const cardHeight = () => {
        const randNum = (Math.random() * 30) - 15;
        return `${randNum}px`
    }

    const drawCard = async () => {
        const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId.current}/draw/`);
        setCards([...cards, {
            image: res.data.cards[0].image,
            rotation: cardRotation(),
            height: cardHeight(),
            key: uuid()
        }])
        setRemaining(res.data.remaining)
    }

    return (
        <div className="CardPile">

            <h3>Cards Remaining In Deck: {remaining >= 0 ? remaining : alert('Error: no cards remaining!')}</h3>

            {remaining ?
                <button onClick={drawCard}>Draw a Card</button> : ""
            }

            <div className="Card">
                {cards.map(card => (
                    <Card img={card.image} rotation={card.rotation} height={card.height} key={card.key} />
                ))}
            </div>

        </div>
    );
}

export default CardPile;