import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { SurveyModelClass } from '../models/SurveyModelClass';
import { PreguntaModelClass } from '../models/PreguntaModelClass';
import { environment } from '../../../environments/environment';
// import { EncuestaModelClass } from '../models/EncuestaModelClass';

import 'rxjs/add/operator/map';

const SERVER_REST_API_URL = "http://localhost:3000/surveys/";

@Injectable()
export class SurveyService {
private serverRestAPIUrl: string;
encuestas:any [] = [];

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
    // let objSurvey: surveyI = JSON.parse(surveyJson)
    // objSurvey.title = tituloParm

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var displayDate = new Date().toLocaleDateString();
    var publicado = false;
    var estadoEncuesta = "CREADA"

    var surveyModel = new SurveyModelClass()
    surveyModel.inicializate(tituloParm,surveyJson,1,currentUser.idUsuario,displayDate,publicado,estadoEncuesta)

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

getEncuestas_x_Usuario( id ){
    return this.http.get(this.serverRestAPIUrl + "/Encuesta?idUsuario=" + id )
        .map(resp => {
            var surveyModel = new SurveyModelClass();
            for (let u of resp.json()) {
                // surveyModel.inicializate(
                //     u.tituloEncuesta, 
                //     u.definicionJSON, 
                //     u.idCategoriaEncuesta,
                //     u.idUsuario,
                //     u.fechaEncuesta,
                //     u.publicado,
                //     u.estadoEncuesta)
                //     console.log(surveyModel)
                this.encuestas.push(u)
            }
          });
}

/**
 * Obtengo las encuestas filtradas por el termino a través de método GET
 * @param termino parametro texto a filtrar
 */
getEncuestaByName(termino){
    return this.http.get(this.serverRestAPIUrl + "/Encuesta?filtro="+termino)
    .map(res =>{
        this.encuestas = res.json();
    }
);
}

/**
 * Actualizacion de estado de encuesta a ARCHIVADA a través de método PUT
 * @param idEncuesta id de Encuesta 
 * @param idUsuario id usuario logueado
 */
archivarEncuesta(idEncuesta, idUsuario){
    console.log("IdEncuesta: "+idEncuesta + " IdUsuario: "+idUsuario)
    let url = this.serverRestAPIUrl + "/Encuesta?estadoEncuesta=archivada&idEncuesta="+idEncuesta+"&idUsuario="+idUsuario;
    let body = "";
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8','Accept': 'application/json' }); 
    let options = new RequestOptions({
        method: 'PUT',
        headers: headers
    });
    return this.http.post(url,body,options)
}



}