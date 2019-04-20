import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services';
import { BaseComponent } from '../../shared/base.component';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent extends BaseComponent implements OnInit {
  @ViewChild('registerForm') registerForm: NgForm;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    super()
  }

  ngOnInit() {
  }


  signUp() {
    this.authService
      .register(this.registerForm.value)
      .pipe(takeWhile(_ => this.isAlive))
      .subscribe((data) => {

        this.router.navigate(['/signin']);
      });
  }

}
