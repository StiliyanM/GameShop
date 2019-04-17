import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserInput } from '../../models/users';
import { ApiService } from './api.service';


@Injectable()
export class AuthService {
  isLogged: any;
  isAdmin: any;

  constructor(private http: ApiService) {
  }

  login(user: UserInput) {
    return this.http.post('user/login', user)
  }

  register(user: UserInput) {
      return this.http.post(`user/register`, user )
  }

  logout() {
      localStorage.removeItem('currentUser')
  }

  isAuthenticated() {
    return localStorage.getItem('currentUser') !== null
  }

  get username() {
    return localStorage.getItem('username')
  }

  get token() {
    return localStorage.getItem('currentUser')
  }

}
