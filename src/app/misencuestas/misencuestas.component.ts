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
    surveyService: SurveyService;
    currentUser: any;

    termino:string ="";

    constructor(SurveyService: SurveyService){
        this.surveyService = SurveyService;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }


    ngOnInit() {
        this.loadEncuestas();
    }

    buscarEncuestas(){
        this.surveyService.getEncuestaByName(this.termino)
        .subscribe();
    }

    loadEncuestas(){
        this.surveyService.getEncuestas_x_Usuario(this.currentUser.idUsuario)
          .subscribe();
    }

    selectEncuesta(encuesta){
        this.activeEncuesta = encuesta;
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
    
}