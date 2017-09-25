import { Component, Input, Output, EventEmitter, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router'

import * as Survey from 'survey-angular';
import * as jquery from 'jquery';
import 'bootstrap';

import { SurveyService } from './../shared/services/survey.service';
import { ClienteModelClass } from './../shared/models/ClienteModelClass';
import { EncuestaModelClass } from './../shared/models/EncuestaModelClass';
import { SurveyModelClass } from './../shared/models/SurveyModelClass';

@Component({
    selector: 'respuestaEncuesta',
    templateUrl: './respuesta.component.html',
    styleUrls: ['./respuesta.component.css']
})
export class respuestaComponent implements OnInit, OnDestroy {
    surveyRender: object;
    id: number; 
    private sub: any;
    surveyService: SurveyService;
    private surveyModel = new SurveyModelClass()
    encuestas: Array<EncuestaModelClass>

    constructor(private route: ActivatedRoute,SurveyService: SurveyService){
        this.surveyService = SurveyService;
    }
  
    ngOnInit() {
         this.sub = this.route.params.subscribe(params => {
         this.id = +params['id']; // (+) converts string 'id' to a number
         if (this.id != null)
         {
            this.encuestas = [];
            var parm: string;
            parm = this.id.toString()
            this.surveyService.getEncuestasById(parm)
            .subscribe((resp) => {
                let u = resp;
                const surveyModel = new Survey.ReactSurveyModel(u.definicionJSON);
                Survey.SurveyNG.render('surveyElement', { model: surveyModel });
                
                surveyModel.onComplete.add(function(result) {
                    console.log(result.data)
                    var item;
                    var listaRespuestas = [];
                    for (var type in result.data) {
                        item = {};
                        item.codigoPregunta = type;
                        item.descripcionRespuesta = result.data[type];
                        item.idEncuesta = parseInt(parm);
                        listaRespuestas.push(item);
                        // console.log(item);
                    }
                    var salida;
                    salida = {};   
                    salida.listaRespuestas = listaRespuestas; 
                    salida.encuestado = {};
                    
                    salida.encuestado.tiempoRespuesta = "2017-09-23T00:28:00";
                    salida.encuestado.ubicacion = "En mi casa haciendo tesis";
                    
                    console.log(JSON.stringify(salida)) 
                    console.log(JSON.parse(salida)) 
                    document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
                    });
              });

             
            
         }
         else{
            alert("else")
         }
         // In a real app: dispatch action to load the details here.
      });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
      }
  

    // selectEncuesta(encuesta){
    //     this.activeEncuesta = encuesta;
    //     console.log(this.activeEncuesta)
    //     this.surveyRender = JSON.parse(this.activeEncuesta.definicion)
    //     console.log(this.surveyRender)
    //     const surveyModel = new Survey.ReactSurveyModel(this.surveyRender);
    //     Survey.SurveyNG.render('surveyElement', { model: surveyModel });
        
    //     surveyModel.onComplete.add(function(result) {
    //         document.querySelector('#surveyResult').innerHTML = "result: " + JSON.stringify(result.data);
    //         console.log(result.data)
    //         }); 
    // }
    
}