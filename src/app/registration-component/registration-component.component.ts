import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';
import {RegisterDetails} from '../authentication/model/credentials';

@Component({
  selector: 'app-registration-component',
  templateUrl: './registration-component.component.html',
  styleUrls: ['./registration-component.component.scss']
})
export class RegistrationComponentComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService) { }

  username: string;
  password: string;
  email: string;
  type: string = 'user';
  //Type is hard coded as user - otherwise registration doesn't work


  ngOnInit() {
  }

  register(): void {
    this.authService.register(new RegisterDetails(this.email, this.username, this.password, this.type));
    //Type is hard coded as user - otherwise registration doesn't work
  }

}
