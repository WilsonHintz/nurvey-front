export class EncuestaModelClass{
    idEncuesta: number;
    tituloEncuesta: string;
    definicion: string;
    idCategoriaEncuesta: number;
    idUsuario: number;


    constructor(idEncuesta,tituloEncuesta,definicion,idCategoriaEncuesta,idUsuario){
        this.idEncuesta = idEncuesta;
        this.tituloEncuesta = tituloEncuesta;
        this.definicion = definicion;
        this.idCategoriaEncuesta = idCategoriaEncuesta;
        this.idUsuario = idUsuario;
    }
}