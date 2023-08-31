import { useEffect } from "react";
import PopupWithForm from "../components/PopupWithForm";
import { useForm } from "../hooks/useForm";

function AddPlacePopup(props) {
  const { values, handleChange, setValues } = useForm({});

  useEffect(() => {
    setValues({
      title: "",
      link: "",
    });
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault(e);

    props.onAddPlace({
      title: values.title,
      link: values.link,
    });
  }

  return (
    <PopupWithForm
      name="place-add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={props.buttonText}
      onSubmit={handleSubmit}
    >
      <input
        required
        type="text"
        placeholder="Название"
        className="popup__input-text popup__input-text_type_name"
        name="title"
        id="title-input"
        minLength="2"
        maxLength="30"
        value={values.title || ""}
        onChange={handleChange}
      />
      <span className="title-input-error popup__input-error"></span>
      <input
        required
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input-text popup__input-text_type_about"
        name="link"
        id="link-input"
        value={values.link || ""}
        onChange={handleChange}
      />
      <span className="link-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
