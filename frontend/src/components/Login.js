import React from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/Auth";
import { useForm } from "../hooks/useForm";

function Login({ handleLogin }) {
  const navigate = useNavigate();

  const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .authorize(values.email, values.password)
      .then((res) => {
        handleLogin();
        navigate("/");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="user-data">
      <h3 className="user-data__title">Вход</h3>
      <form
        name="user-data-form"
        className="user-data__form"
        onSubmit={handleSubmit}
      >
        <input
          required
          type="email"
          placeholder="Email"
          className="user-data__input-text user-data__input-text_type_email"
          name="email"
          id="email-input"
          minLength={2}
          maxLength={40}
          value={values.email || ""}
          onChange={handleChange}
        />

        <input
          required
          type="password"
          placeholder="Пароль"
          className="user-data__input-text user-data__input-text_type_password"
          name="password"
          id="password-input"
          minLength={2}
          maxLength={200}
          value={values.password || ""}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="user-data__save-button"
          aria-labelledby
        >
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
