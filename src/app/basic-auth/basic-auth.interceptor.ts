import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../authentication/authentication.service'

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const basicAuth = this.authService.getBasicAuth();

        if(basicAuth){
            request = request.clone({
                setHeaders: { Authorization: 'Basic ' + basicAuth }
            });
        }

        return next.handle(request);
    }
}