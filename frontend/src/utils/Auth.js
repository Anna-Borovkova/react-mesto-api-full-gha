const baseUrl = "http://localhost:3000";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((res) => checkResponse(res));
};

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((res) => checkResponse(res));
};

export const signOut = () => {
  return fetch(`${baseUrl}/signout`, {
    method: "GET",
    credentials: 'include',
  }).then((res) => checkResponse(res));
};

export const getContent = () => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    credentials: 'include',
  }).then((res) => checkResponse(res));
};
