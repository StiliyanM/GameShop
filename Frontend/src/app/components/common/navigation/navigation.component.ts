import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {  }

  authenticated = false

  ngOnInit() {
    this.authenticated = this.authService.isAuthenticated()
  }

  logout() {
    this.authService.logout();

    this.router.navigate([ '/signin' ]);
  }
}
