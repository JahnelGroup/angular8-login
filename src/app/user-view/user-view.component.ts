import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetails } from '../authentication/model/credentials';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  userViewing: UserDetails;
  user: UserDetails;
  isOwnPage: boolean;

  constructor(private authService: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.authService.getUserSubject().getValue();
    let username:string = this.route.snapshot.queryParams['username'];
    this.authService.getOtherUser(username).then( otherUser => {
      this.userViewing = otherUser;
      this.isOwnPage = this.user.username == this.userViewing.username;
    })
  }

}
