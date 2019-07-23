import { Injectable } from '@angular/core';
import { Post } from './models/post';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {TokenDetails, UserDetails} from '../authentication/model/credentials';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private readonly ROOT_URL = 'http://localhost:5000/api/';
  posts:Post[] = new Array<Post>();

  constructor(private http: HttpClient) { }

  getPosts(){
    if(this.posts.length == 0){
      this.posts.push({ post: 'Post 1', username: 'username1'});
      this.posts.push({ post: 'Post 2', username: 'username2'});
      this.posts.push({ post: 'Post 3', username: 'username3'});
    }
    return this.posts;
  }

  post(postText:String, user:UserDetails){
    this.createPost(postText, user.username)
  }

  createPost(postText:String, token: TokenDetails | string):void{
    let post:Post = {post: postText, username: "user"}
    this.posts.push(post);
    const headers = typeof token === 'string' ? new HttpHeaders( {Authorization: 'Basic ' + btoa(token + ':')}) :
      new HttpHeaders({Authorization: 'Basic ' + btoa(token.token + ':')});
    this.http.post<Post>(this.ROOT_URL + 'users/me/posts', { message: postText }, {headers}).toPromise().then(response => {
      console.log("Posted");
    });
  }
}
