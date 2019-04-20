import { Injectable } from '@angular/core';

import { UserInput } from '../../models/users';
import { ApiService } from './api.service';
import { Subject } from 'rxjs/internal/Subject';
import { of } from 'rxjs/internal/observable/of';


@Injectable()
export class AuthService {

  username: Subject<string> = new Subject<string>()

  constructor(private http: ApiService) {
  }

  login(user: UserInput) {
    return this.http.post('user/login', user)
  }

  register(user: UserInput) {
    return this.http.post(`user/register`, user)
  }

  logout() {
    localStorage.clear()
  }

  isAuthenticated() {
    return localStorage.getItem('currentUser') !== null
  }

  getUsername() {
    return localStorage.getItem('username')
  }

  get isAdmin() {
    return localStorage.getItem('isAdmin') === 'true'
  }

  get token() {
    return localStorage.getItem('currentUser')
  }

  save(data) {
    localStorage.setItem('currentUser', data.token)
    localStorage.setItem('isAdmin', data.user.isAdmin)
    localStorage.setItem('username', data.user.username)

    this.username.next(localStorage.getItem('username'))
  }

}
