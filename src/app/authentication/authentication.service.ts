import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subscription, BehaviorSubject} from 'rxjs';
import {Credentials, RegisterDetails, TokenDetails, UserDetails} from './model/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly LOCAL_STORAGE_TOKEN_KEY = 'accessToken';
  private readonly ROOT_URL = 'http://localhost:5000/api/';
  private user: UserDetails;
  private tokenDetails: TokenDetails;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private http: HttpClient) { }

  private saveToken(tokenDetails: TokenDetails) {
    localStorage.setItem(this.LOCAL_STORAGE_TOKEN_KEY, tokenDetails.token);
    this.tokenDetails = tokenDetails;
  }

  private removeToken() {
    localStorage.removeItem(this.LOCAL_STORAGE_TOKEN_KEY);
    this.tokenDetails = undefined;
  }

  private getToken(): TokenDetails | string {
    if (!this.tokenDetails) {
      return localStorage.getItem(this.LOCAL_STORAGE_TOKEN_KEY);
    }
    return this.tokenDetails;
  }

  isLoggedIn():BehaviorSubject<boolean> {
    this.loggedIn.next(this.getToken() !== null);
    return this.loggedIn;
  }

  register(registerUser: RegisterDetails): void {
    this.http.post<UserDetails>(this.ROOT_URL + 'registerUser', registerUser).subscribe(response => {
      this.router.navigate(['login']);
    });
  }

  login(credentials: Credentials): Promise<UserDetails> {
    const headers = new HttpHeaders({
      Authorization: credentials.basicAuth
    });
    return this.http.get<TokenDetails>(this.ROOT_URL + 'auth/token', { headers }).toPromise().then(tokenDetails => {
      this.saveToken(tokenDetails);
      this.loggedIn.next(true);
      return this.loggedInUser(tokenDetails);
    });
  }

  logout(){
    this.removeToken();
    this.user = undefined;
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }

  loggedInUser(token: TokenDetails | string): Promise<UserDetails> {
    const headers = typeof token === 'string' ? new HttpHeaders( {Authorization: 'Basic ' + btoa(token + ':')}) :
      new HttpHeaders({Authorization: 'Basic ' + btoa(token.token + ':')});
    return this.http.get<UserDetails>(this.ROOT_URL + 'users/me', { headers }).toPromise().then(userDetails => {
      this.user = userDetails;
      return this.user;
    });
  }

  getUser(): UserDetails | Promise<UserDetails> {
    const token = this.getToken();
    if (this.user) {
      return this.user;
    } else if (token) {
      return this.loggedInUser(token);
    } else {
      return null;
    }
  }

}
