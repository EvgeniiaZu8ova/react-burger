import { normaApiOptions } from "./config";

class Api {
  constructor(config) {
    this._baseUrl = config.url;
    this._headers = config.headers;
  }

  _handlePromise(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка ${res.status}`));
  }

  getIngredientsData() {
    return fetch(`${this._baseUrl}/ingredients`, {
      headers: this._headers,
    }).then((res) => this._handlePromise(res));
  }

  makeOrder(data) {
    return fetch(`${this._baseUrl}/orders`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        ingredients: data,
      }),
    }).then((res) => this._handlePromise(res));
  }

  register({ email, password, name }) {
    return fetch(`${this._baseUrl}/auth/register`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    }).then((res) => this._handlePromise(res));
  }

  resetPassword(email) {
    return fetch(`${this._baseUrl}/password-reset`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
      }),
    }).then((res) => this._handlePromise(res));
  }

  changePassword({ password, token }) {
    return fetch(`${this._baseUrl}/password-reset/reset`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        token: token,
      }),
    }).then((res) => this._handlePromise(res));
  }
}

const api = new Api(normaApiOptions);

export default api;
