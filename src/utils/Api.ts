import { normaApiOptions } from "./config";

class Api {
  private _headers: any;
  private _baseUrl: any;
  constructor(config: { url: any; headers: any }) {
    this._baseUrl = config.url;
    this._headers = config.headers;
  }

  _handlePromise(res: Response) {
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

  makeOrder(accessToken: string, data: (string | undefined)[]) {
    return fetch(`${this._baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        ingredients: data,
      }),
    }).then((res) => this._handlePromise(res));
  }

  getUserInfo(accessToken: string) {
    return fetch(`${this._baseUrl}/auth/user`, {
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    }).then((res) => this._handlePromise(res));
  }

  updateUserInfo({
    accessToken,
    name,
    email,
  }: {
    accessToken: string;
    name: string;
    email: string;
  }) {
    return fetch(`${this._baseUrl}/auth/user`, {
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({
        email: email,
        name: name,
      }),
      redirect: "follow",
      referrerPolicy: "no-referrer",
    }).then((res) => this._handlePromise(res));
  }

  register({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string | undefined;
  }) {
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

  login({ email, password }: { email: string; password: string }) {
    return fetch(`${this._baseUrl}/auth/login`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: this._headers,
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => this._handlePromise(res));
  }

  logout(refreshToken: string | undefined) {
    return fetch(`${this._baseUrl}/auth/logout`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        token: refreshToken,
      }),
    }).then((res) => this._handlePromise(res));
  }

  refreshToken(refreshToken: string | undefined) {
    return fetch(`${this._baseUrl}/auth/token`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        token: refreshToken,
      }),
    }).then((res) => this._handlePromise(res));
  }

  resetPassword(email: string) {
    return fetch(`${this._baseUrl}/password-reset`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
      }),
    }).then((res) => this._handlePromise(res));
  }

  changePassword({ password, token }: { password: string; token: string }) {
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
