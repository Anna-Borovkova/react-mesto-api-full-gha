import React from "react";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm({
  isOpen,
  onSubmit,
  name,
  title,
  buttonText,
  children,
}) {
  const { isLoading } = useContext(AppContext);
  const { closeAllPopups } = useContext(AppContext);
  usePopupClose(isOpen, closeAllPopups);

  return (
    <div
      className={
        isOpen
          ? `popup popup_opacity_light popup_opened`
          : `popup popup_opacity_light `
      }
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="reset"
          aria-label="Закрыть окно редактирования профиля."
          onClick={closeAllPopups}
        />
        <h3 className="popup__title">{title}</h3>
        <form name={`${name}-form`} className="popup__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__save-button" aria-labelledby>
            {isLoading ? "Сохранение..." : buttonText || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
