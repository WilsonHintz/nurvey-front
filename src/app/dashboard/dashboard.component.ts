import { Component, OnInit } from '@angular/core';
import { ResultadoService } from '../shared/services/resultados.service';
import * as Chartist from 'chartist';

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
    labelsGrafico = []; 
    seriesGrafico = [];
    labelsGraficoProyecto = []; 
    seriesGraficoProyecto = [];
    labelsGraficoJornadas = []; 
    seriesGraficoJornadas = [];
    horaChartExposicionPoster : any;

    constructor(resultadoService: ResultadoService){
      this.resultadoService = resultadoService;
      this.labelsGrafico = []; 
      this.seriesGrafico = [];
      this.labelsGraficoProyecto = []; 
      this.seriesGraficoProyecto = [];
      this.labelsGraficoJornadas = []; 
      this.seriesGraficoJornadas = [];
  }
    ngOnInit(){

      

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
}
