import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SurveyModelClass } from '../models/SurveyModelClass';
import { environment } from '../../../environments/environment'

import 'rxjs';

const SERVER_REST_API_URL = "http://localhost:3000/surveys/";

@Injectable()
export class SurveyService {
private http: Http;
private serverRestAPIUrl: string;
surveyFound: SurveyModelClass;
salidaString: string;
surveyObjet: Object;

constructor(http:Http) {
    this.http = http;
    this.serverRestAPIUrl = environment.apiEndPoint + "/api";
}

getSurveys(){
    return this.http.get(SERVER_REST_API_URL)
    .map(res => res.json());
}

getCategorias(){
    return this.http.get(this.serverRestAPIUrl + "/Categoria")
    .map(res => res.json());    
}

getEncuestas(){
    return this.http.get(this.serverRestAPIUrl + "/Encuesta")
    .map(res => res.json());    
}

getClientesByFiltro(parm: String){
    return this.http.get(this.serverRestAPIUrl + "/Cliente?filtro=" + parm)
    .map(res => res.json());  
}  

saveSurvey(survey: SurveyModelClass) {
    //console.log(survey);
    //var header = {'id': 1000, 'userName':"Cooper"};
    //var jsonHeader = JSON.stringify(header)
   
    //let body = JSON.stringify(survey);
    //let surveyArray = [];
    //surveyArray.push(jsonHeader)
    //jsonHeader = jsonHeader.concat(body)
    //surveyArray = surveyArray.concat(body)
    //let surveyJson = JSON.stringify(jsonHeader)
    //console.log(surveyArray)

    //let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    //return this.http.post(SERVER_REST_API_URL, jsonHeader, options);

    let body = JSON.stringify(survey); 
    let headers = new Headers({ 'Content-Type': 'application/json' }); 
    let options = new RequestOptions({ headers: headers }); 
    return this.http.post(SERVER_REST_API_URL, body, options);
}

getSurveyById(surveyIdParm: Number) : string {
    this.getSurveys()
        .subscribe((resp) => {
            for (let u of resp) {
                
                if (u.id === surveyIdParm) {
                    //console.log(u.id)
                    //console.log("las paginas")
                    //console.log(u.pages)
                    console.log("si coincide...")
                    this.surveyObjet = u
                    console.log("surveyObject: "+this.surveyObjet)
                    this.salidaString = JSON.stringify(this.surveyObjet)
                    return this.salidaString;
                }
                else {
                    console.log("no coincide...")
                    this.salidaString = ""
                }
            }
        })
        return this.salidaString;
}

}