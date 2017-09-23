export class EncuestaModelClass{
    idEncuesta: number;
    tituloEncuesta: string;
    definicion: string;
    idCategoriaEncuesta: number;
    idUsuario: number;


    constructor(idEncuesta,tituloEncuesta,definicionJSON,idCategoriaEncuesta,idUsuario){
        this.idEncuesta = idEncuesta;
        this.tituloEncuesta = tituloEncuesta;
        this.definicion = definicionJSON;
        this.idCategoriaEncuesta = idCategoriaEncuesta;
        this.idUsuario = idUsuario;
    }
}