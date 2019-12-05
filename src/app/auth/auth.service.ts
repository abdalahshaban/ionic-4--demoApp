import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticate = true;
  private _userId = 'abc'

  get userIsAuthenticate() {
    return this._userIsAuthenticate
  }
  get userId() {
    return this._userId
  }
  constructor() { }

  login() {
    this._userIsAuthenticate = true
  }

  logout() {
    this._userIsAuthenticate = false
  }
}
