import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { PostsService } from '../posts/posts.service';
import {Credentials, UserDetails} from '../authentication/model/credentials';
import { Post } from '../posts/models/post';
 
@Component({
  selector: 'app-posts-component',
  templateUrl: './posts-component.component.html',
  styleUrls: ['./posts-component.component.scss']
})
export class PostsComponentComponent implements OnInit {

  private postText: String

  private user: UserDetails

  private posts: Post[];

  constructor(private authService: AuthenticationService,
    private postsService: PostsService) { }

  ngOnInit() {
    const user = this.authService.getUser();
    if ((user as UserDetails).username) {
      this.user = user as UserDetails;
    } else {
      (user as Promise<UserDetails>).then(userDetails => {
        this.user = userDetails;
      });
    }

    this.posts = this.postsService.getPosts();
  }

  post(){
    if(this.postText){
      this.postText = "";
    }
  }

}
