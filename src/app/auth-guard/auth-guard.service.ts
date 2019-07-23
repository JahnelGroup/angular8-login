import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = await this.authenticationService.getUser();
    if(user){
      return true;
    } else {
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}})
      return false;
    }
  }
}
