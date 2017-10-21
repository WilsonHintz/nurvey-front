export class SurveyModelClass{
    idEncuesta: number;
    definicionJSON: string;
    idCategoriaEncuesta: number;
    idUsuario: number;
    tituloEncuesta: string;
    fechaEncuesta: string;
    publicado: boolean;
    estadoEncuesta: string;

    constructor(idEncuesta,tituloEncuesta,definicionJSON,idCategoriaEncuesta,idUsuario,fechaEncuesta,publicado,estadoEncuesta){
        this.idEncuesta = idEncuesta;
        this.tituloEncuesta = tituloEncuesta;
        this.definicionJSON = definicionJSON;
        this.idCategoriaEncuesta = idCategoriaEncuesta;
        this.idUsuario = idUsuario;
        this.fechaEncuesta = fechaEncuesta;
        this.publicado = publicado;
        this.estadoEncuesta = estadoEncuesta;
    }

    public inicializate(definicionJSON,idCategoriaEncuesta,idUsuario,tituloEncuesta,fechaEncuesta,publicado,estadoEncuesta){
        
        this.definicionJSON = JSON.parse(definicionJSON);
        this.idCategoriaEncuesta = idCategoriaEncuesta;
        this.idUsuario = idUsuario;
        this.tituloEncuesta = tituloEncuesta;
        this.fechaEncuesta = fechaEncuesta;
        this.publicado = publicado;
        this.estadoEncuesta = estadoEncuesta;
    }
}