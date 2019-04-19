import { Injectable } from '@angular/core';

import { UserInput } from '../../models/users';
import { ApiService } from './api.service';


@Injectable()
export class AuthService {

  constructor(private http: ApiService) {
  }

  login(user: UserInput) {
    return this.http.post('user/login', user)
  }

  register(user: UserInput) {
    return this.http.post(`user/register`, user)
  }

  logout() {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('username')
  }

  isAuthenticated() {
    return localStorage.getItem('currentUser') !== null
  }

  get username() {
    return localStorage.getItem('username')
  }

  get isAdmin() {
    return !!localStorage.getItem('isAdmin')

  }

  get token() {
    return localStorage.getItem('currentUser')
  }

}
