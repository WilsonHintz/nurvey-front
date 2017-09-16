
import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as SurveyEditor from 'surveyjs-editor';
import 'jquery';
import 'bootstrap';

import { SurveyService } from '../shared/services/survey.service';
import { SurveyModelClass } from '../shared/models/SurveyModelClass';

SurveyEditor.editorLocalization.currentLocale = "es";

@Component({
    selector: 'editor',
     template: `<div id="surveyEditorContainer"></div>`,
     styleUrls: ['./survey.css'],
    
})
export class SurveyEditorComponent  {
    editor: SurveyEditor.SurveyEditor;
    surveyService: SurveyService;
    newSurvey: SurveyModelClass;
    @Input() json: any;
    @Output() surveySaved: EventEmitter<Object> = new EventEmitter();

    ngOnInit() {
        let editorOptions = { showEmbededSurveyTab: false, generateValidJSON : true, showJSONEditorTab: false};
        this.editor = new SurveyEditor.SurveyEditor('surveyEditorContainer', editorOptions);
        this.editor.text = JSON.stringify(this.json);
        this.editor.saveSurveyFunc = this.saveMySurvey;
    }

    constructor(surveyService: SurveyService) {
        this.surveyService = surveyService;
    }

    saveMySurvey = () => {
        console.log(this.editor.text); // json puro
        console.log(JSON.stringify(this.editor.text)); //json stringify
        console.log(JSON.parse(this.editor.text)); // json parseado a Objeto para emitir
       this.surveySaved.emit(JSON.parse(this.editor.text));

        this.newSurvey = JSON.parse(this.editor.text);

        this.surveyService.saveSurvey(this.newSurvey)
            .subscribe(() => {
                survey => this.newSurvey
                this.surveySaved.emit({Survey: this.newSurvey});
            })
    }

}