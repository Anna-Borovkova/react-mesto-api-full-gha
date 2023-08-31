import { useEffect, useState, useContext } from "react";
import PopupWithForm from "../components/PopupWithForm";
import CurrentUserContext from "../context/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        required
        type="text"
        placeholder="Имя"
        className="popup__input-text popup__input-text_type_name"
        name="user"
        id="name-input"
        minLength={2}
        maxLength={40}
        value={name || ""}
        onChange={handleNameChange}
      />

      <span className="name-input-error popup__input-error"></span>

      <input
        required
        type="text"
        placeholder="О себе"
        className="popup__input-text popup__input-text_type_about example"
        name="about"
        id="profession-input"
        minLength={2}
        maxLength={200}
        value={description || ""}
        onChange={handleDescriptionChange}
      />

      <span className="profession-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
