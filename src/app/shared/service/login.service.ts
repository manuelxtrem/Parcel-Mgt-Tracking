import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import {
  User,
  UserProfile,
  AppSettings,
  TokenResult,
  Person,
  LoginDetail,
  UserType,
  RegisterDetail
} from '../model';
import { AuthService } from './auth.service';

declare var moment;

@Injectable()
export class LoginService {
  constructor(private authService: AuthService, private http: Http) {}

  login(username: string, password: string, userType: string): Observable<any> {
    let url = `${AppSettings.SERVER_AUTH}/account/signin`;
    let body: any = { email: username, password: password, rememberMe: true };

    if (userType === UserType.CUSTOMER) {
      url = `${AppSettings.SERVER_AUTH}/account/signincustomer`;
      body = { userName: username, password: password, rememberMe: true };
    }

    return this.http
      .post(url, body, this.authService.requestOptions())
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const token = <TokenResult>response.json();

        if (token && token.accessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.setUserToken(token);
          this.setUserIdentity(token.id);
        }

        return token;
      });
  }

  getUser(userId: number): Observable<Person> {
    return this.http
      .get(
        `${AppSettings.SERVER}/people/${userId}`,
        this.authService.requestOptions()
      )
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const user = <Person>response.json();

        if (user && user.id) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.setUserLoggedIn(user);
        }

        return user;
      });
  }

  addLoginDetails(details: RegisterDetail): Observable<any> {
    return this.http
      .put(
        `${AppSettings.SERVER_AUTH}/account/register`,
        details,
        this.authService.requestOptions()
      )
      .map((response: Response) => {
        return response.json();
      });
  }

  editLoginDetails(details: LoginDetail): Observable<any> {
    return this.http
      .post(
        `${AppSettings.SERVER_AUTH}/account/change`,
        details,
        this.authService.requestOptions()
      )
      .map((response: Response) => {
        return response.json();
      });
  }

  logUserIn(username: string, password: string): Observable<any> {
    const auth = btoa(`${username}:${password}`);
    const headers = new Headers({
      Authorization: `Basic ${auth}`,
      'X-API-KEY': AppSettings.API_KEY,
      'X-VALIDITY': AppSettings.SESSION
    });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .get(`${AppSettings.SERVER}/auth/login`, options)
      .map((res: Response) => <any>res.json())
      .catch(this.handleError);
  }

  logUserOut() {
    // return Promise.resolve(`${this.serverURL}/logout`);
    const auth = AppSettings.USER_AUTH;
    const headers = new Headers({
      Authorization: `Basic ${auth}`,
      'X-API-KEY': AppSettings.API_KEY,
      'X-VALIDITY': AppSettings.SESSION
    });
    const options = new RequestOptions({ headers: headers });

    return this.http
      .get(`${AppSettings.SERVER}/auth/logout`, options)
      .toPromise()
      .then(data => data);
  }

  private handleError(error: Response) {
    console.log('UserProfile ERROR:', error.toString());
    return Observable.throw(error.json().error || 'Server Error');
  }

  storeUserProfile(profile: Person): void {
    localStorage.setItem('login_user', JSON.stringify(profile));
  }

  storeUserAuth(auth: string): void {
    console.log('DEPRECATION', 'LoginService::storeUserAuth(auth)');
    // localStorage.setItem('login_auth', auth);
  }

  getUserProfile(): Person {
    return localStorage.getItem('login_user')
      ? JSON.parse(localStorage.getItem('login_user'))
      : null;
  }

  isAdmin(): boolean {
    return this.getUserProfile().personType.toLowerCase() === UserType.ADMIN;
  }

  isCustomer(): boolean {
    return this.getUserProfile().personType.toLowerCase() === UserType.CUSTOMER;
  }

  isDriver(): boolean {
    return this.getUserProfile().personType.toLowerCase() === UserType.DRIVER;
  }

  getUserIdentity(): string {
    return localStorage.getItem('login_identity');
  }

  setUserIdentity(identity: string): void {
    localStorage.setItem('login_identity', identity);
  }

  setUserToken(token: TokenResult): void {
    localStorage.setItem('login_identity', token.id);
    localStorage.setItem('login_auth', token.tokenType);
    localStorage.setItem('login_session', token.accessToken);
    localStorage.setItem('login_time', moment.now());
  }

  setUserLoggedIn(profile: Person): void {
    localStorage.setItem('login_status', 'true');
    this.storeUserProfile(profile);
  }

  setUserLoggedOut(): void {
    localStorage.removeItem('login_status');
    localStorage.removeItem('login_user');
    localStorage.removeItem('login_auth');
    localStorage.removeItem('login_session');
    localStorage.removeItem('login_time');
  }

  isUserLoggedIn(): boolean {
    if (
      localStorage.getItem('login_status') === 'true' &&
      localStorage.getItem('login_user') &&
      // && ((moment.now() - (+localStorage.getItem('login_time'))) < 900000) TODO use if needed
      localStorage.getItem('login_session')
    ) {
      // re set the time so that user does not get logged out after 30 mins
      localStorage.setItem('login_time', moment.now());
      console.log('login', 'user logged in');
      return true;
    } else {
      this.setUserLoggedOut();
      console.log('login', 'user logged out');
      return false;
    }
  }

  getUserSession(): string {
    return localStorage.getItem('login_session');
  }
}
