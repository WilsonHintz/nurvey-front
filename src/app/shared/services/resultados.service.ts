import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { SurveyModelClass } from '../models/SurveyModelClass';
import { environment } from '../../../environments/environment'

import 'rxjs';

const SERVER_REST_API_URL = "http://localhost:3000/surveys/";

@Injectable()
export class ResultadoService {
private http: Http;
private serverRestAPIUrl: string;

constructor(http:Http) {
    this.http = http;
    this.serverRestAPIUrl = environment.apiEndPoint + "/api";
}


getResultadosGeneral(nombreGrafico: string, idEncuesta: number){
    
    return this.http.get(this.serverRestAPIUrl + "/Resultados?nombreGrafico="+nombreGrafico+"&idEncuesta="+idEncuesta)
    .map(res => res.json());    
}

}