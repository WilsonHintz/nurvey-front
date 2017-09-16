import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
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
    
    interface surveyI {
        title: string;
        pages: string;
    }

    let surveyJson = JSON.stringify(survey)

    let objSurvey: surveyI = JSON.parse(surveyJson)

    var surveyModel = new SurveyModelClass()

    surveyModel.inicializate(surveyJson,1,1,objSurvey.title)

    let surveyJsonToPost = JSON.stringify(surveyModel)

    console.log("SURVEY JSON TO POST "+surveyJsonToPost)

    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8','Accept': 'application/json' }); 
    let options = new RequestOptions({
        method: 'POST',
        url: this.serverRestAPIUrl + "/Encuesta",
        headers: headers,
        body: JSON.stringify(surveyModel)
    });

    return this.http.post(this.serverRestAPIUrl + "/Encuesta", surveyJsonToPost, options)
}

getSurveyById(surveyIdParm: Number) : string {
    this.getSurveys()
        .subscribe((resp) => {
            for (let u of resp) {
                
                if (u.id === surveyIdParm) {
                    this.surveyObjet = u
                    console.log("surveyObject: "+this.surveyObjet)
                    this.salidaString = JSON.stringify(this.surveyObjet)
                    return this.salidaString;
                }
                else {
                    this.salidaString = ""
                }
            }
        })
        return this.salidaString;
}

}