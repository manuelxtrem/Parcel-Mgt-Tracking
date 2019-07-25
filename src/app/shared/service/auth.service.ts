import { Injectable, EventEmitter } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { UserProfile, AppSettings } from '../model';

@Injectable()
export class AuthService {
    loggedIn = false;
    authHeaders: Headers;

    constructor(private http: Http) {
    }

    requestOptions(search?: URLSearchParams): RequestOptionsArgs {
        this._setAuthHeaders();

        return {
            search: search,
            headers: this.authHeaders,
            // withCredentials: true
            // body: body
        };
    }


    private _setAuthHeaders() {
        this.authHeaders = new Headers();
        this.authHeaders.append('Content-Type', 'application/json');

        const tokenType = localStorage.getItem('login_auth');
        const accessToken = localStorage.getItem('login_session');

        if (tokenType && accessToken) {
            this.authHeaders.append('Authorization', `${tokenType} ${accessToken}`);
        }
    }

}
