import React from "react";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup(props) {
  const { closeAllPopups } = useContext(AppContext);

  usePopupClose(props.openedCard?.link, closeAllPopups);

  return (
    <div
      className={`popup popup_opacity_dark ${
        props.openedCard ? "popup_opened" : ""
      }`}
    >
      <div className="popup__center">
        <img
          className="popup__open-card-img"
          src={props.openedCard?.link}
          alt={props.openedCard?.name}
        />
        <button
          className="popup__close-button"
          type="reset"
          aria-label="Закрыть окно добавления фото."
          onClick={props.onClose}
        ></button>
        <h3 className="popup__open-card-title">{props.openedCard?.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
