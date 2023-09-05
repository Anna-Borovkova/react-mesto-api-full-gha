import React from "react";
import logo from "../images/header-logo.svg";
import {
  useLocation,
  Link,
  useNavigate,
  Route,
  Routes,
} from "react-router-dom";
import * as auth from "../utils/Auth";

function Header(props) {
  const location = useLocation();

  const navigate = useNavigate();

  // function signOut() {
  //   localStorage.removeItem("jwt");
  //   props.handleSingOut();
  //   navigate("/signin");
  // }

  function signOut () {
    auth
      .signOut()
      .then((res) => {
        props.handleSignOut();
        navigate("/signin");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <header className="header page__header">
      <img className="header__logo" src={logo} alt="Логотип Место Россия." />
      <div className="header__row-orientation">
        {location.pathname == "/signin" && (
          <Link
            to="/signup"
            className="header__button"
            type="button"
            aria-label="Регистрация."
          >
            Регистрация
          </Link>
        )}
        {location.pathname == "/signup" && (
          <Link
            to="/signin"
            className="header__button"
            type="button"
            aria-label="Войти."
          >
            Войти
          </Link>
        )}
        {location.pathname == "/" && (
          <>
            <div className="header__user-email">{props.userData?.email}</div>
            <button
              className="header__button header__button_light"
              type="button"
              aria-label="Выйти."
              onClick={signOut}
            >
              Выйти
            </button>
          </>
        )}
        {/* <Route exact path="/">
            <div>
              <p className="header__user-email">{props.userData?.data.email}</p>
              <button
                className="header__button header__button_light"
                onClick={signOut}
              >
                Выйти
              </button>
            </div>
          </Route>
          <Route path="/sign-up">
            <Link className="header__button" to="sign-in">
              Войти
            </Link>
          </Route>
          <Route path="/sign-in">
            <Link className="header__button" to="sign-up">
              Регистрация
            </Link>
          </Route> */}
      </div>
    </header>
  );
}

export default Header;
