import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subscription, BehaviorSubject} from 'rxjs';
import {Credentials, RegisterDetails, TokenDetails, UserDetails} from './model/credentials';
import { Post } from '../posts/models/post';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly LOCAL_STORAGE_TOKEN_KEY = 'accessToken';
  private readonly ROOT_URL = 'http://localhost:5000/api/';
  private userSubject: BehaviorSubject<UserDetails> = new BehaviorSubject<UserDetails>(null);
  private tokenDetails: TokenDetails;

  constructor(private router: Router, private http: HttpClient) { }

  private saveToken(tokenDetails: TokenDetails) {
    localStorage.setItem(this.LOCAL_STORAGE_TOKEN_KEY, tokenDetails.token);
    this.tokenDetails = tokenDetails;
  }

  private removeToken() {
    localStorage.removeItem(this.LOCAL_STORAGE_TOKEN_KEY);
    this.tokenDetails = undefined;
  }

  getToken(): TokenDetails | string {
    if (!this.tokenDetails) {
      return localStorage.getItem(this.LOCAL_STORAGE_TOKEN_KEY);
    }
    return this.tokenDetails;
  }

  getBasicAuth(): string {
    const token = this.getToken();
    if(token){
      return typeof token === 'string' ? btoa(token + ':') : btoa(token.token + ':');
    } else {
      return null;
    }
  }

  register(registerUser: RegisterDetails): Promise<any> {
    return this.http.post<UserDetails>(this.ROOT_URL + 'registerUser', registerUser).toPromise().then(response => {
      this.router.navigate(['login']);
    });
  }

  login(credentials: Credentials): Promise<UserDetails> {
    // Creates its own header to supply basic auth with username/password instead of token
    const headers = new HttpHeaders({
      Authorization: credentials.basicAuth
    });
    return this.http.get<TokenDetails>(this.ROOT_URL + 'auth/token', { headers }).toPromise().then(tokenDetails => {
      this.saveToken(tokenDetails);
      return this.loggedInUser(tokenDetails);
    });
  }

  removedExpiredSession(): void {
    this.removeToken();
    this.userSubject.next(null);
  }

  logout(): void {
    this.removeToken();
    this.userSubject.next(null);
    this.router.navigate(['']);
  }

  loggedInUser(token: TokenDetails | string): Promise<UserDetails> {
    return this.http.get<UserDetails>(this.ROOT_URL + 'users/me').toPromise().then(userDetails => {
      this.userSubject.next(userDetails);
      return userDetails;
    }).catch(err => {
      this.removeToken();
      this.userSubject.next(null);
      return null;
    });
  }

  getUserSubject(): BehaviorSubject<UserDetails> {
    return this.userSubject;
  }

  getUser(): UserDetails | Promise<UserDetails> {
    const token = this.getToken();
    const user = this.userSubject.getValue();
    if (user) {
      return user;
    } else if (token) {
      return this.loggedInUser(token);
    } else {
      return null;
    }
  }

  getOtherUser(username:string): Promise<UserDetails> {
    return this.http.get<UserDetails>(this.ROOT_URL + 'users/' + username).toPromise();
  }
}
