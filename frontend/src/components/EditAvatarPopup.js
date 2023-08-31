import { useRef, useEffect } from "react";
import PopupWithForm from "../components/PopupWithForm";

function EditAvatarPopup(props) {
  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault(e);

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        required
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input-text popup__input-text_type_about"
        name="about"
        id="avatar-input"
        ref={avatarRef}
      />
      <span className="avatar-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
