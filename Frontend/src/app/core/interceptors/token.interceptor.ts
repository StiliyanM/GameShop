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
        const isAuthenticated = this.auth.isAuthenticated();

        if (isAuthenticated) {
            const token = this.auth.token;

            request = request.clone({
                setHeaders: {
                    'Authorization': `Basic ${token}`
                }
            });

        return next.handle(request);
    }
}
}
