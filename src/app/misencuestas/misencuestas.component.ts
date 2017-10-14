import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router'
import * as Survey from 'survey-angular';

import { SurveyService } from './../shared/services/survey.service';
import { ClienteModelClass } from './../shared/models/ClienteModelClass';
import { EncuestaModelClass } from './../shared/models/EncuestaModelClass';

@Component({
    selector: 'misEncuestas',
    templateUrl: './misencuestas.component.html',
    styleUrls: ['./misencuestas.component.css']
})
export class misEncuestasComponent implements OnInit {
    surveyRender: object;
    encuestas: Array<EncuestaModelClass>
    activeEncuesta;
    encuestaActiva: boolean;
    surveyService: SurveyService;
    termino:string ="";
    currentUser:any = JSON.parse(localStorage.getItem('currentUser'));
    
    encuesta:Object = { 
        estadoEncuesta: "" 
    } 
 
    estados = [ 
        { 
            codigo: "CRE", 
            descripcion: "Creada" 
        }, 
        { 
            codigo: "ARC", 
            descripcion: "Archivada" 
        }, 
        { 
            codigo: "RES", 
            descripcion: "Respondida" 
        }] 

    constructor(SurveyService: SurveyService){
        this.surveyService = SurveyService;
    }

    /** 
     * Inicializacion de pantalla: 
     * Carga de encuestas por usuario  
     * Seteo de encuesta como NO SELECCIONADA 
     */ 
    ngOnInit() { 
        this.loadEncuestas(); 
        this.encuestaActiva = false; 
    } 

    /** 
     * Cargar encuestas por usuarios 
     */ 
    loadEncuestas(){ 
        this.surveyService.getEncuestas_x_Usuario(this.currentUser.idUsuario) 
          .subscribe(); 
    } 

    /** 
     * Busqueda de encuestas por titulo 
     */ 
    buscarEncuestas(){ 
        this.surveyService.getEncuestaByName(this.termino) 
        .subscribe(); 
    } 

    /**
     * Mostrar vista previa de la encuesta creada.
     * @param encuesta encuesta seleccionada en la grilla
     */
    selectEncuesta(encuesta){
        this.activeEncuesta = encuesta;
        this.encuestaActiva = true;
        console.log(this.activeEncuesta)
        this.surveyRender = JSON.parse(this.activeEncuesta.definicionJSON) 
        console.log(this.surveyRender)
        const surveyModel = new Survey.ReactSurveyModel(this.surveyRender);

        Survey.SurveyNG.render('surveyElement', { model: surveyModel });

        surveyModel.onComplete.add(function(result) {
            document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
            console.log(result.data)
            });
    }

     /** 
     * Mediante el servicio surveyService.archivarEncuesta permite modificar el estado de la encuesta a ARCHIVADA 
     * @param idEncuesta id de Encuesta 
     */ 
    archivarEncuesta(idEncuesta){ 
        let idUsuario = this.currentUser.idUsuario; 
        this.surveyService.archivarEncuesta(idEncuesta,idUsuario) 
            .subscribe( 
                res => { 
                    alert("La encuesta ha sido archivada.") 
                } 
            ) 
    } 
    
}