import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationService {
    private http: Http;
    private serverRestAPIUrl: string;

    constructor(http: Http) { 
        this.http = http;
        this.serverRestAPIUrl = environment.apiEndPoint + "/api";
    }

    login(email: string, password: string) {
        return this.http.post(this.serverRestAPIUrl + '/Usuario', { email: email, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}