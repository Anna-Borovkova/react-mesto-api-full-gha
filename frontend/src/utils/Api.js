class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    // this._authorization = headers.authorization;
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
      // headers: {
      //   authorization: this._authorization,
      // },
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
      // headers: {
      //   authorization: this._authorization,
      // },
    });
  }

  getUserInfo() {
    return this._request("users/me", {
      credentials: 'include',
      // headers: {
      //   authorization: this._authorization,
      // },
    });
  }

  changeUserInfo(name, about) {
    return this._request("users/me", {
      method: "PATCH",
      credentials: 'include',
      headers: {
        // authorization: this._authorization,
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
        // authorization: this._authorization,
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
        // authorization: this._authorization,
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
        // authorization: this._authorization,
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
  // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  baseUrl: "http://localhost:3000",
  headers: {
    // authorization: "1c76f591-c372-466f-895e-d2709195d17b",
    "Content-Type": "application/json",
  },
});
