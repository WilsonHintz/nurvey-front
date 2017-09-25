import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { UserModelClass } from '../models/UserModelClass';

@Injectable()
export class AuthenticationService {
    private http: Http;
    private serverRestAPIUrl: string;
    isLoggedIn = false;

    constructor(http: Http) { 
        this.http = http;
        this.serverRestAPIUrl = environment.apiEndPoint + "/api";
    }

    login(emailUsuario: string, passwordUsuario: string) {
        return this.http.get(this.serverRestAPIUrl + '/Usuario?emailUsuario=' + emailUsuario + '&passwordUsuario=' + passwordUsuario )
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user.idUsuario != 0) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    let userLogueado = localStorage.getItem('currentUser')
                    console.log(userLogueado)
                    this.isLoggedIn = true;
                }
                else
                {
                    alert("Usuario o contraseña incorrectos")
                }

                return user;
            });
    }

    public isAuthenticated(): boolean {
        return this.isLoggedIn;
      } 

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.isLoggedIn = false;
    }
}