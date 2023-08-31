import React from "react";
import { useContext } from "react";
import successRegistration from "../images/success-registration.svg";
import unSuccessRegistration from "../images/unsuccess-registration.svg";
import AppContext from "../context/AppContext";
import { usePopupClose } from "../hooks/usePopupClose";

function InfoTooltip(props) {
  const { closeAllPopups } = useContext(AppContext);

  usePopupClose(props.isOpen, closeAllPopups);

  return (
    <div
      className={
        props.isOpen
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
        ></button>

        {props.isRegistrationSuccess ? (
          <div className="popup__content">
            <img className="popup__img" src={successRegistration} />
            <h3 className="popup__subtitle">Вы успешно зарегистрировались!</h3>
          </div>
        ) : (
          <div className="popup__content">
            <img className="popup__img" src={unSuccessRegistration} />
            <h3 className="popup__subtitle">
              Что-то пошло не так! Попробуйте ещё раз.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoTooltip;
