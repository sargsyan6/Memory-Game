import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./Card";
import { cardImages } from "./Animals images";

function App() {
  const [cards, setCards] = useState([]);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (first && second) {
      setDisabled(true);
      if (first.src === second.src) {
        setIsStarted(true);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === first.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        reset();
      } else {
        setTimeout(() => reset(), 1000);
      }
    }
  }, [first, second]);

  useEffect(() => {
    shuffleCards();
  }, []);

  const reset = () => {
    setFirst(null);
    setSecond(null);
    setDisabled(false);
  };

  let shuffleCards = () => {
    let shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((item) => ({ ...item, id: Math.random() }));
    setCards(shuffled);
  };

  const handleCard = (card) => {
    first && card.id !== first.id ? setSecond(card) : setFirst(card);
  };

  return (
    <div className="container">
      {cards.map((item) => {
        return (
          <Card
            handleCard={handleCard}
            key={item.id}
            card={item}
            flipped={item === first || item === second || item.matched}
            disabled={disabled}
            setDisabled={setDisabled}
          />
        );
      })}
      {isStarted && (
        <div className="new-game">
          {cards.filter((it) => it.matched === true).length ===
            cards.length && <div className="congratulation ">Congratulation  ! You Win</div>}
          <div>
            <button
              onClick={() => {
                shuffleCards();
                setIsStarted(false);
              }}
            >
              New Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
