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
  password2: string;
  email: string;
  types = [{value: 'user', viewValue:'User'}, {value: 'admin', viewValue: 'Admin'}, {value: 'invalid', viewValue: 'Invalid'}];
  type: string = 'user';
  imgURL;
  error = {};
  //Type is hard coded as user - otherwise registration doesn't work

  ngOnInit() {
  }

  register(): void {
    this.authService.register(new RegisterDetails(this.email, this.username, this.password, this.password2, this.type)).catch(err => {
      this.error = err.error;
    });
    //Type is hard coded as user - otherwise registration doesn't work
  }

  imageSelected(selectedURL){
    this.imgURL = selectedURL;
    console.log(this.imgURL);
  }

}
