import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { UserModelClass } from '../models/UserModelClass';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {
    private http: Http;
    private serverRestAPIUrl: string;

    constructor(http: Http) {
        this.http = http;
        this.serverRestAPIUrl = environment.apiEndPoint + "/api";
     }

    getAll() {
        return this.http.get(this.serverRestAPIUrl + '/Usuario').map((response: Response) => response.json());
    }

    getByid(idUsuario: string) {
        return this.http.get(this.serverRestAPIUrl + '/Usuario?idUsuario=' + idUsuario).map((response: Response) => response.json());
    }

    create(user: UserModelClass) {
        let userJson = JSON.stringify(user)
       // console.log(userJson);
         let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8','Accept': 'application/json' }); 
         let options = new RequestOptions({
            method: 'POST',
            url: this.serverRestAPIUrl + '/Usuario',
            headers: headers,
            body: JSON.stringify(user)
         });
         console.log(options);
        return this.http.post(this.serverRestAPIUrl + '/Usuario', userJson, options);
    }

    update(user: UserModelClass) {
        return this.http.put(this.serverRestAPIUrl + '/Usuario?idUsuario=' + user.idUsuario, user);
    }

    delete(idUsuario: string) {
        return this.http.delete(this.serverRestAPIUrl + '/Usuario?idUsuario=' + idUsuario);
    }
}