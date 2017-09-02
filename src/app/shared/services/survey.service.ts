import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SurveyModelClass } from '../models/SurveyModelClass';

import 'rxjs';

const SERVER_REST_API_URL = "http://localhost:3000/surveys/";

@Injectable()
export class SurveyService {
private http: Http;

constructor(http:Http) {
    this.http = http;
}

getSurveys(){
    return this.http.get(SERVER_REST_API_URL)
    .map(res => res.json());
}

saveSurvey(survey: SurveyModelClass) {
    //console.log(survey);
    var header = {'id': 1000, 'userName':"Cooper"};
    var jsonHeader = JSON.stringify(header)
   
    let body = JSON.stringify(survey);
    //let surveyArray = [];
    //surveyArray.push(jsonHeader)
    jsonHeader = jsonHeader.concat(body)
    //surveyArray = surveyArray.concat(body)
    let surveyJson = JSON.stringify(jsonHeader)
    //console.log(surveyArray)

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(SERVER_REST_API_URL, jsonHeader, options);
}

}