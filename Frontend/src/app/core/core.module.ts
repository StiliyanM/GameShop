import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from './services/game.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ToastrService, ApiService, AuthService, CartService } from './services';
import { ToastrModule } from 'ngx-toastr';
import { OrderService } from './services/order.service';
import { ConfirmationDialogService } from './services/common/confirmation-dialog.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SuccessInterceptor } from './interceptors/success.interceptor';

@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
  ],

  providers: [
    HttpClient,
    ApiService,
    ToastrService,
    GameService,
    AuthService,
    CartService,
    OrderService,
    ConfirmationDialogService,
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
  ],

})
export class CoreModule { }
