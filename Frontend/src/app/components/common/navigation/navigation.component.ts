import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ToastrService } from 'src/app/core/services';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  username = this.authService.username;
  cartItems = 0
  logout() {
    this.authService.logout();
    this.toastrService.success('You have logged out successfully!')
    this.router.navigate([ '/signin' ]);
  }
}
