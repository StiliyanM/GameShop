import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserInput } from '../../models/users';
import { ApiService } from './api.service';


@Injectable()
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
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
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }

  isAuthenticated() {
    return localStorage.getItem('currentUser') !== null
  }

}
