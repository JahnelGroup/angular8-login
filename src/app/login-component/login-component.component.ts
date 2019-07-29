import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';
import {Credentials} from '../authentication/model/credentials';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {

  private username: string;
  private password: string;
  private failedLogin: boolean = false;
  private failedLoginMessage: String = "";

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authenticationService.login(new Credentials(this.username, this.password)).then(userDetails => {
      this.failedLogin = false;
      this.failedLoginMessage = "";
      this.router.navigate(['home']);
    }).catch( err => {
      this.failedLogin = true;
      if(!this.username && !this.password){
        this.failedLoginMessage = "You must enter a username and password";
      } else if(!this.username){
        this.failedLoginMessage = "You must enter a username";
      } else if(!this.password){
        this.failedLoginMessage = "You must enter a password";
      } else {
        this.failedLoginMessage = "Invalid username or password";
      }
    });
  }

}
