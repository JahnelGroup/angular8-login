import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../authentication/authentication.service';
import {UserDetails} from '../authentication/model/credentials';


@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.scss']
})
export class NavbarComponentComponent implements OnInit {
  isLoggedIn: Observable<UserDetails>;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.getUserSubject().asObservable();
  }

  onLogout() {
    this.authenticationService.logout();
  }

}
