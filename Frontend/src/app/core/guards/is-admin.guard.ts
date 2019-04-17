// Decorators
import { Injectable } from '@angular/core';

// Router
import {
  CanActivate,
  CanLoad,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route,
  Router
} from '@angular/router';

// RXJS
import { Observable } from 'rxjs';
import { AuthService } from '../services';

// Services

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanLoad, CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAdmin();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAdmin();
  }

  private isAdmin(): boolean {
    if (this.auth.isAdmin) {
      return true;
    }

    this.router.navigate(['/user/login']);
    return false;
  }
}
