import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services';
import { BaseComponent } from '../../shared/base.component';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent extends BaseComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    super()
   }

  ngOnInit() {
  }

  signIn() {
    this.authService
      .login(this.loginForm.value)
      .pipe(takeWhile(_ => this.isAlive))
      .subscribe((data) => {
        this.authService.save(data)
        this.router.navigate([ '/home' ]);
      });
  }

}
