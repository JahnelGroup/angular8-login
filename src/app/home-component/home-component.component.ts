import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Credentials, UserDetails} from '../authentication/model/credentials';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponentComponent implements OnInit {

  private user: UserDetails;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    const user = this.authenticationService.getUser();
    if ((user as UserDetails).username) {
      this.user = user as UserDetails;
    } else {
      (user as Promise<UserDetails>).then(userDetails => {
        this.user = userDetails;
      });
    }
  }

}
