class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._contentType = headers["Content-Type"];
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}/` + endpoint, options).then(
      this._checkResponse
    );
  }

  getInitialCards() {
    return this._request("cards", {
      credentials: 'include',
    });
  }

  postNewCard(name, link) {
    return this._request("cards", {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(id) {
    return this._request("cards/" + id, {
      method: "DELETE",
      credentials: 'include',
    });
  }

  getUserInfo() {
    return this._request("users/me", {
      credentials: 'include',
    });
  }

  changeUserInfo(name, about) {
    return this._request("users/me", {
      method: "PATCH",
      credentials: 'include',
      headers: {
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  changeAvatar(avatar) {
    return this._request("users/me/avatar", {
      method: "PATCH",
      credentials: 'include',
      headers: {
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  addLike(cardId) {
    return this._request("cards/" + cardId + "/likes", {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        cardId: cardId,
      }),
    });
  }

  deleteLike(cardId) {
    return this._request("cards/" + cardId + "/likes", {
      method: "DELETE",
      credentials: 'include',
      headers: {
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        cardId: cardId,
      }),
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.deleteLike(cardId);
    } else {
      return this.addLike(cardId);
    }
  }
}

export const api = new Api({
  // baseUrl: "http://localhost:3001",
  baseUrl: "https://api.mestoab.students.nomoredomainsicu.ru",
  headers: {
    "Content-Type": "application/json",
  },
});
