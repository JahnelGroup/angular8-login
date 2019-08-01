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
    const user: UserDetails = await this.authService.getUser();
    const username = user.username;

    return this.http.get<Post[]>(this.ROOT_URL + 'users/' + username + '/posts/all').toPromise().then(posts => {
      return posts.reverse();
    });
  }

  post(postText:String){
    return this.http.post<Post>(this.ROOT_URL + 'users/me/posts', { message: postText }).toPromise();
  }

  async deletePostById(postId){
    const user: UserDetails = await this.authService.getUser();
    const username = user.username;
    this.http.delete(this.ROOT_URL + 'users/' + username + '/posts/' + postId).toPromise().then(res => {
      console.log("Successful Delete");
    }).catch( err => {
      console.log("Error");
    });
  }
}
