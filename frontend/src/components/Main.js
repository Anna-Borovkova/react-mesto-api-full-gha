import { useContext } from "react";
import Card from "../components/Card";
import CurrentUserContext from "../context/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__blocks">
          <img
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          />
          <div
            className="profile__avatar-edit-button"
            onClick={props.onEditAvatar}
          ></div>
          <div className="profile__info">
            <div className="profile__row-orientation">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                aria-label="Открыть окно редактирования профиля."
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить фото."
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="places">
        <ul className="places__list">
          {props.cards.map(({ _id, ...photo }) => (
            <li key={_id}>
              {" "}
              <Card
                _id={_id}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
                {...photo}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
