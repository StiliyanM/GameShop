import { Component, OnDestroy, OnInit, Input, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ToastrService, CartService } from 'src/app/core/services';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit, DoCheck {

  username: string
  isAdmin: boolean
  cartItems: number

  constructor(
    public authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private cartService: CartService
  ) {
  }

  ngOnInit() {
    this.username = this.authService.getUsername()
    this.isAdmin = this.authService.isAdmin
    this.cartItems = this.cartService.getCount()

  }


  ngDoCheck() {
    this.cartItems = this.cartService.getCount()
    this.isAdmin = this.authService.isAdmin
    this.username = this.authService.getUsername()
  }
  logout() {
    this.authService.logout();
    this.toastrService.success('You have logged out successfully!')
    this.router.navigate(['/signin']);
  }

}
