export class SurveyModelClass{
    idEncuesta: number;
    definicion: string;
    idCategoriaEncuesta: number;
    idUsuario: number;
    tituloEncuesta: string;

    constructor(idEncuesta,definicion,idCategoriaEncuesta,idUsuario,tituloEncuesta){
        this.idEncuesta = idEncuesta;
        this.definicion = definicion;
        this.idCategoriaEncuesta = idCategoriaEncuesta;
        this.idUsuario = idUsuario;
        this.tituloEncuesta = tituloEncuesta;
    }
}