import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../authentication/authentication.service'

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService, private router: Router) {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const basicAuth = this.authService.getBasicAuth();

        if(basicAuth && !request.headers.has('Authorization')){
            request = request.clone({
                setHeaders: { Authorization: 'Basic ' + basicAuth }
            });
        }

        return next.handle(request);

        // return next.handle(request).pipe(catchError( err => {
        //     // Error catching might be better suited to be split up into a different interceptor
        //     if(err.status == 401){
        //     }
        //     return throwError(err);
        // }));
    }
}