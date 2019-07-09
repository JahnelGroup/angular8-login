import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';

@Component({
  selector: 'app-registration-component',
  templateUrl: './registration-component.component.html',
  styleUrls: ['./registration-component.component.scss']
})
export class RegistrationComponentComponent implements OnInit {

  constructor(private router: Router) { }

  username: string;
  password: string;
  email: string;

  ngOnInit() {
  }

  register(): void {
    alert('will register ' + this.username);
  }

}
