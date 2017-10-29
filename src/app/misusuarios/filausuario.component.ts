import { Component, Input, OnInit } from '@angular/core';

import { UserModelClass } from '../shared/models/UserModelClass';
import { ResultadoService } from '../shared/services/resultados.service';
import * as Chartist from 'chartist';


@Component({
    selector: 'filaUsuario',
    templateUrl: './filausuario.component.html'
})
export class filaUsuarioComponent implements OnInit {
    @Input() usuario: UserModelClass;
    resultadoService: ResultadoService;
    mostrarGrafico: boolean;
    seriesGrafico = [];
    labelsGrafico = []; 

    constructor(resultadoService: ResultadoService){
        this.mostrarGrafico = false;
        this.resultadoService = resultadoService;
    }

    
    ngOnInit() { 
        
        
        
    } 

    toggleGrafico(){        
        this.mostrarGrafico = !this.mostrarGrafico;
        this.resultadoService.getResultadosEncuestasXUsuario(this.usuario.idUsuario)
        .subscribe((resp) => {         
          for(var item = 0; item < resp.labels.length; item++){
            this.labelsGrafico.push(resp.labels[item]);    
            var serie = resp.series[item];
            this.seriesGrafico.push({value:serie,className:"myclass"+(item+1), nombre:resp.labels[item]});
          }
          
          var char = Chartist.Bar('#chart_'+this.usuario.idUsuario, {            
            labels: this.labelsGrafico,
            series: this.seriesGrafico
          },{
            distributeSeries:true
          });  

          char.on('draw', function(data) {
            var barHorizontalCenter, barVerticalCenter, label, value;
            if (data.type === "bar") {
                barHorizontalCenter = data.x1 + (data.element.width() * .5);
                barVerticalCenter = data.y1 + (data.element.height() * -1) - 5;
                value = data.element.attr('ct:value');
                if (value !== '0') {
                label = new Chartist.Svg('text');
                label.text(value);
                label.addClass("ct-barlabel");
                label.attr({
                    x: barHorizontalCenter,
                    y: barVerticalCenter,
                    'text-anchor': 'middle'
                });
                return data.group.append(label);
                }
            }
            });

        });
    }
    
}