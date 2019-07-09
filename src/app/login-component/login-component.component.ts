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

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authenticationService.login(new Credentials(this.username, this.password)).then(userDetails => {
      this.router.navigate(['home']);
    });
  }

}
