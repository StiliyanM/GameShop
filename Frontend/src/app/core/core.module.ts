import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from './services/game.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SuccessInterceptor } from './interceptors/success.interceptor';
import { ToastrService, ApiService, AuthService, CartService } from './services';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SuccessInterceptor,
      multi: true
    },
    HttpClient,
    ApiService,
    ToastrService,
    GameService,
    AuthService,
    CartService
  ]

})
export class CoreModule { }
