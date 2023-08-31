import React from "react";
import { useContext } from "react";
import CurrentUserContext from "../context/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.owner._id === currentUser._id;
  const isLiked = props.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `place__like-button ${
    isLiked && "place__like-button_active"
  }`;

  return (
    <div className={`${currentUser ? "place" : ""}`}>
      <img
        className="place__img"
        src={props.link}
        alt={props.name}
        onClick={() => props.onCardClick(props)}
      />
      {isOwn && (
        <button
          className="place__delete-button"
          type="button"
          aria-label="Удалить фото."
          onClick={() => props.onCardDelete(props)}
        ></button>
      )}

      <div className="place__row-orientation">
        <h2 className="place__title">{props.name}</h2>
        <div className="place__line-orientation">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Фото нравится."
            onClick={() => props.onCardLike(props)}
          ></button>
          <p className="place__like-number">{props.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
