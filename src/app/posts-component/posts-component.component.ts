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

  private posts;

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

    this.postsService.getPosts().then(posts => {
      this.posts = posts;
    });

  }

  post(){
    if(this.postText){
      this.postsService.post(this.postText);
      this.posts.unshift({created: "Just Now", message: this.postText, username: this.user.username}) // Adds post immediately to posts page
      this.postText = "";
    }
  }

  deletePost(post:Post){
    this.postsService.deletePostById(post.id);
    this.posts = this.posts.filter( p => p.id != post.id);
  }
}
