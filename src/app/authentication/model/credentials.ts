
export interface UserDetails {
  email: string;
  username: string;
}

export interface TokenDetails {
  duration: number;
  token: string;
}

export class RegisterDetails implements UserDetails {
  constructor(public email: string, public username: string, private password: string) {}
}

export class Credentials {
  constructor(public username: string, private password: string) {}

  get basicAuth(): string {
    return 'Basic ' + btoa(this.username + ':' + this.password);
  }
}
