import { Component, OnInit } from '@angular/core';
import { ResultadoService } from '../shared/services/resultados.service';
import * as Chartist from 'chartist';
import { SurveyService } from './../shared/services/survey.service';

declare var $:any;
declare var labelsGrafico:any;
declare var seriesGrafico:any;

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})

export class DashboardComponent implements OnInit{
    resultadoService: ResultadoService;  
    nombreGrafico: string;
    preguntasEncuesta = []; 
    labelsGrafico = []; 
    seriesGrafico = [];
    labelsGraficoProyecto = []; 
    seriesGraficoProyecto = [];
    labelsGraficoJornadas = []; 
    seriesGraficoJornadas = [];
    horaChartExposicionPoster : any;
    surveyService: SurveyService;

    constructor(resultadoService: ResultadoService, surveyService: SurveyService){
      this.resultadoService = resultadoService;
      this.labelsGrafico = []; 
      this.seriesGrafico = [];
      this.labelsGraficoProyecto = []; 
      this.seriesGraficoProyecto = [];
      this.labelsGraficoJornadas = []; 
      this.seriesGraficoJornadas = [];
      this.surveyService = surveyService;
  }  
    ngOnInit(){
      this.loadEncuestas();
        this.preguntasEncuesta.push({id:1,descripcion:"Preguntas 1"});
        this.preguntasEncuesta.push({id:2,descripcion:"Preguntas 2"});
        this.preguntasEncuesta.push({id:3,descripcion:"Preguntas 3"});
        this.preguntasEncuesta.push({id:4,descripcion:"Preguntas 4"});
      

        var colorGenerador = 1;
        this.resultadoService.getResultadosGeneral("PROYECTO_NURVEY",59)
        .subscribe((resp) => {         
          for(var item = 0; item < resp.labels.length; item++){
            this.labelsGraficoProyecto.push(resp.labels[item]);    
            var serie = resp.series[item];
            this.seriesGraficoProyecto.push({value:serie,className:"myclass"+(item+1), nombre:resp.labels[item]});
          }
          
          /*Chartist.Bar('#chartNuestroProyecto', {            
            series: this.seriesGraficoProyecto,
            labels: this.labelsGraficoProyecto
          });*/          

          Chartist.Bar('#chartNuestroProyecto', {
            labels: this.labelsGraficoProyecto,
            series: this.seriesGraficoProyecto
          }, {
            distributeSeries: true
          });

        });
             
        
        colorGenerador = 1;
        this.resultadoService.getResultadosGeneral("EXPOSICION_POSTER",59)
        .subscribe((resp) => {         
          for(var item = 0; item < resp.labels.length; item++){
            this.labelsGrafico.push(resp.labels[item]);    
            var serie = resp.series[item];
            this.seriesGrafico.push({value:serie,className:"myclass"+(item+1), nombre:resp.labels[item]});
          }
          
          Chartist.Pie('#chartExposicionPoster', {            
            series: this.seriesGrafico
          },{
            labelInterpolationFnc: function(value) {
              return value + '%';
            }
          });          
        });
      

        colorGenerador = 1;
        this.resultadoService.getResultadosGeneral("JORNADAS_PUERTAS_ABIERTAS",59)
        .subscribe((resp) => {         
          for(var item = 0; item < resp.labels.length; item++){
            this.labelsGraficoJornadas.push(resp.labels[item]);    
            var serie = resp.series[item];
            this.seriesGraficoJornadas.push({value:serie,className:"myclass"+(item+1), nombre:resp.labels[item]});
          }
          
          Chartist.Pie('#chartJornadasPuertasAbiertas', {            
            series: this.seriesGraficoJornadas
          },{
            labelInterpolationFnc: function(value) {
              return value + '%';
            }
          });          
        });

        
    }

    loadEncuestas(){
        this.surveyService.getEncuestas()
          .subscribe();
    }

    onChange(deviceValue) {
      this.surveyService.getPreguntasEncuesta()
          .subscribe();              
    }
}
