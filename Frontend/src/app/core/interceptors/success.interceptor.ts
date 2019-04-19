// Decorators
import { Injectable, Injector } from '@angular/core';

// RXJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// HTTP
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

// Services
import { ToastrService } from '../services/common';

@Injectable()
export class SuccessInterceptor implements HttpInterceptor {

    private toastr: ToastrService

  constructor(inj: Injector) {
    this.toastr = inj.get(ToastrService)
   }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              if (event.body.message || event.body.message !== '') {
                this.toastr.success(event.body.message);
              }
            }
          }
        )
      );
  }
}
