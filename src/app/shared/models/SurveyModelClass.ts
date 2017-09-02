export class SurveyModelClass{
    surveyId: number;
    surveyName: string;
    userName: string;

    constructor(surveyId,surveyName,userName){
        this.surveyId = surveyId;
        this.surveyName = surveyName;
        this.userName = userName;
    }
}