import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/signin']);

    return false;
  }
}
