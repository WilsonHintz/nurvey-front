import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { SurveyModelClass } from '../models/SurveyModelClass';
import { environment } from '../../../environments/environment';
// import { EncuestaModelClass } from '../models/EncuestaModelClass';

import 'rxjs/add/operator/map';

const SERVER_REST_API_URL = "http://localhost:3000/surveys/";

@Injectable()
export class SurveyService {
private serverRestAPIUrl: string;
encuestas:any [] = [];
preguntas:any [] = [];

constructor( private http:Http) {
    this.serverRestAPIUrl = environment.apiEndPoint + "/api";
}

getEncuestas(){
    return this.http.get(this.serverRestAPIUrl + "/Encuesta")
        .map(resp => {
            for (let u of resp.json()) {
              this.encuestas.push(
                new SurveyModelClass(
                    u.idEncuesta,
                    u.tituloEncuesta, 
                    u.definicionJSON, 
                    u.idCategoriaEncuesta,
                    u.idUsuario,
                    u.fechaEncuesta,
                    u.publicado,
                    u.estadoEncuesta)
                                    );
                                        }
                    }
            );
}

getEncuestas_x_Usuario( id ){
    return this.http.get(this.serverRestAPIUrl + "/Encuesta?idUsuario=" + id )
        .map(resp => {
            for (let u of resp.json()) {
                this.encuestas.push(
                    new SurveyModelClass(
                        u.idEncuesta,
                        u.tituloEncuesta, 
                        u.definicionJSON, 
                        u.idCategoriaEncuesta,
                        u.idUsuario,
                        u.fechaEncuesta,
                        u.publicado,
                        u.estadoEncuesta)
                                        );
            }
          });
}

getEncuestaByName(termino){
    return this.http.get(this.serverRestAPIUrl + "/Encuesta?filtro="+termino)
    .map(res =>{
        this.encuestas = res.json();
    }
);
}

getEncuestasById(id: string){
     return this.http.get(this.serverRestAPIUrl + "/Encuesta?idEncuesta=" + id)
     .map(res => res.json());
}

saveSurvey(survey: SurveyModelClass, tituloParm:string) {
    
    interface surveyI {
        title: string;
        pages: string;
    }

    let surveyJson = JSON.stringify(survey)
    let objSurvey: surveyI = JSON.parse(surveyJson)
    /*
    *   Inicializamos el objeto SURVEY con la informacion necesaria.
    */
    var surveyModel: SurveyModelClass;
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var displayDate = new Date().toLocaleDateString();
    var publicado = false;
    var estadoEncuesta = "CREADA"

    surveyModel.inicializate(surveyJson,1,currentUser.idUsuario,tituloParm,displayDate,publicado,estadoEncuesta)

    let surveyJsonToPost = JSON.stringify(surveyModel)
    console.log(surveyJsonToPost)
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8','Accept': 'application/json' }); 
    let options = new RequestOptions({
        method: 'POST',
        url: this.serverRestAPIUrl + "/Encuesta",
        headers: headers,
        body: JSON.stringify(surveyModel)
    });

    return this.http.post(this.serverRestAPIUrl + "/Encuesta", surveyJsonToPost, options)
}

guardarRespuesta(parm: any){
    console.log("llega al servicio"+ parm)
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8','Accept': 'application/json' }); 
    let options = new RequestOptions({
        method: 'POST',
        url: this.serverRestAPIUrl + "/Respuestas",
        headers: headers,
        body: parm
    });

    return this.http.post(this.serverRestAPIUrl + "/Respuestaas", parm, options)
}

getPreguntasEncuesta(){
    
    return this.http.get(this.serverRestAPIUrl + "/Pregunta")
        .map(resp => {
            for (let u of resp.json()) {                                
                if(u.idEncuesta == 59){
                    this.preguntas.push(u);
                }
            }
        });
}

}