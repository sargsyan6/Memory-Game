import React from "react";

function Card({ card, handleCard, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleCard(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card" />
        <img
          className="back"
          src="https://e7.pngegg.com/pngimages/711/634/png-clipart-brand-black-and-white-pattern-question-mark-text-black-thumbnail.png"
          onClick={handleClick}
          alt="before click"
        />
      </div>
    </div>
  );
}

export default Card;
