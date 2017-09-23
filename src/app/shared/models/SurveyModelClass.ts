export class SurveyModelClass{
    idEncuesta: number;
    definicionJSON: string;
    idCategoriaEncuesta: number;
    idUsuario: number;
    tituloEncuesta: string;

    constructor(){}

    public inicializate(definicion,idCategoriaEncuesta,idUsuario,tituloEncuesta){
        
        this.definicion = JSON.parse(definicion);
        this.idCategoriaEncuesta = idCategoriaEncuesta;
        this.idUsuario = idUsuario;
        this.tituloEncuesta = tituloEncuesta;
    }
}