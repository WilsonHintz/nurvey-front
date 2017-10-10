import { Component, OnInit, Input } from '@angular/core';
import { SurveyService } from './../shared/services/survey.service';

@Component({
    selector: 'grafico-pregunta',
    moduleId: module.id,
    templateUrl: 'graficoPregunta.component.html',
    styleUrls: ['graficoPregunta.component.css']
})

export class GraficoPreguntaComponent implements OnInit{            
    @Input() title: string;
    surveyService: SurveyService;

    constructor(SurveyService: SurveyService){
        this.surveyService = SurveyService;
    }
    ngOnInit(){        
        
    }

    
}
