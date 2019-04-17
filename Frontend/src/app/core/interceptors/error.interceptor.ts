import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, throwError } from 'rxjs';
  import { catchError } from 'rxjs/operators';
import { ToastrService } from '../services/common';

  @Injectable()
  export class ErrorInterceptor implements HttpInterceptor {
    constructor(private notificationService: ToastrService) {}

    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {
          console.log(err);

          this.notificationService.error(err.error.message, 'An error has ocurred!');

          return throwError(err);
        })
      );
    }
  }
