import {
    HttpHandler,
    HttpEvent,
    HttpRequest,
    HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/common';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        // const currentUser = this.auth.currentUserValue;
        // if (currentUser && currentUser.token) {
        //     request = request.clone({
        //         setHeaders: {
        //             Authorization: `Bearer ${currentUser.token}`
        //         }
        //     });
        // }

        return next.handle(request);
    }
}
