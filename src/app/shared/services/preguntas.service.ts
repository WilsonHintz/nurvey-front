import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { PreguntaModelClass } from '../models/PreguntaModelClass';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class PreguntasService {
    private serverRestAPIUrl: string;
    preguntas:PreguntaModelClass [] = [];
    preguntasAgrupables:PreguntaModelClass [] = [];

    constructor( private http:Http) {
        this.serverRestAPIUrl = environment.apiEndPoint + "/api";
    }

    getPreguntasEncuesta(idEncuesta:number){        
        this.preguntas = [];
        return this.http.get(this.serverRestAPIUrl + "/Pregunta")
            .map(resp => {
                for (let u of resp.json()) {
                    if(u.idEncuesta == idEncuesta && !u.esAgrupable){
                        this.preguntas.push(
                            new PreguntaModelClass(
                                u.idEncuesta,
                                u.idPregunta,
                                u.idCategoria,
                                u.idTipoPregunta,
                                u.descripcion,
                                u.name));
                    }
                }
                
            });
    }

    getPreguntasAgrupablesEncuesta(idEncuesta:number){        
        this.preguntasAgrupables = [];
        return this.http.get(this.serverRestAPIUrl + "/Pregunta")
            .map(resp => {
                for (let u of resp.json()) {                    
                    if(u.idEncuesta == idEncuesta && u.esAgrupable){
                        this.preguntasAgrupables.push(
                            new PreguntaModelClass(
                                u.idEncuesta,
                                u.idPregunta,
                                u.idCategoria,
                                u.idTipoPregunta,
                                u.descripcion,
                                u.name));
                    }
                }
                
            });
    }
}