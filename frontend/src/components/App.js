import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { api } from "../utils/Api.js";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import EditProfilePopup from "../components/EditProfilePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";
import AddPlacePopup from "../components/AddPlacePopup";
import ImagePopup from "../components/ImagePopup";
import CurrentUserContext from "../context/CurrentUserContext";
import AppContext from "../context/AppContext";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/Auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cards, getCards] = useState([]);

  const navigate = useNavigate();

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUserAuth, setCurrentUserAuth] = useState(null);
  const [isRegistrationResultOpen, setIsRegistrationResultOpen] =
    useState(false);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        getCards(cardsData);
      })
      .catch(console.error);
  }, [isLoggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsRegistrationResultOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        getCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        getCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch(console.error);
  }

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(newUserData) {
    function makeRequest() {
      return api
        .changeUserInfo(newUserData.name, newUserData.about)
        .then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar(avatar) {
    function makeRequest() {
      return api.changeAvatar(avatar.avatar).then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  function handleAddPlaceSubmit(card) {
    function makeRequest() {
      return api.postNewCard(card.title, card.link).then((createdCard) => {
        const newCard = createdCard;
        getCards([newCard, ...cards]);      
      });
    }
    handleSubmit(makeRequest);
  }


  const checkToken = () => {
    // const jwt = localStorage.getItem("jwt");
    auth
      .getContent()
      .then((res) => {
        if (!res) {
          return;
        }
        setCurrentUserAuth(res);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setLoggedIn(false);
        setCurrentUserAuth(null);
        console.log(err);
      });
  };

  useEffect(() => {
    checkToken();
  }, [isLoggedIn]);

  return (
    <div className="body">
      <div className="page">
        <AppContext.Provider value={{ isLoading, closeAllPopups }}>
          <CurrentUserContext.Provider value={currentUser}>
            <Header
              handleSignOut={() => setLoggedIn(false)}
              userData={currentUserAuth}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                    element={Main}
                  />
                }
              ></Route>
              <Route
                path="/signup"
                element={
                  isLoggedIn ? (
                    <Navigate to="/" />
                  ) : (
                    <Register
                      handleRegistrationSuccess={setIsRegistrationSuccess}
                      handleRegistrationResultOpen={setIsRegistrationResultOpen}
                    />
                  )
                }
              />
              <Route
                path="/signin"
                element={
                  isLoggedIn ? (
                    <Navigate to="/" />
                  ) : (
                    <Login handleLogin={() => setLoggedIn(true)} />
                  )
                }
              />
              <Route
                path="*"
                element={
                  isLoggedIn ? <Navigate to="/" /> : <Navigate to="signin" />
                }
              />
            </Routes>

            <Footer />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onUpdateUser={handleUpdateUser}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              buttonText="Создать"
              onAddPlace={handleAddPlaceSubmit}
            />

            <InfoTooltip
              isOpen={isRegistrationResultOpen}
              isRegistrationSuccess={isRegistrationSuccess}
              name="registration-result"
              title="Редактировать профиль"
            />

            <ImagePopup openedCard={selectedCard} onClose={closeAllPopups} />
          </CurrentUserContext.Provider>
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
