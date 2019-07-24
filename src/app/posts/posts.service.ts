import { Injectable } from '@angular/core';
import { Post } from './models/post';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import {TokenDetails, UserDetails} from '../authentication/model/credentials';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private readonly ROOT_URL = 'http://localhost:5000/api/';
  posts:Post[] = new Array<Post>();

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  async getPosts(){
    if(this.posts.length == 0){
      this.posts.push({ post: 'Post 1', username: 'username1'});
      this.posts.push({ post: 'Post 2', username: 'username2'});
      this.posts.push({ post: 'Post 3', username: 'username3'});
    }

    const user: UserDetails = await this.authService.getUser();
    const username = user.username;

    return this.http.get<Post>(this.ROOT_URL + 'users/' + username + '/posts').toPromise().then(posts => {
      return posts;
    });
  }

  post(postText:String){
    this.http.post<Post>(this.ROOT_URL + 'users/me/posts', { message: postText }).toPromise().then(post => {
      console.log("Posted");
    });
  }
}
