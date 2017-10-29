export class UserModelClass{
    idUsuario: number;
    nombreUsuario: string;
    emailUsuario: string;
    passwordUsuario: string;
    fechaAlta: Date
    //repeatpasswordUsuario: string;
    
    constructor(idUsuario,nombreUsuario,emailUsuario,passwordUsuario,fechaAlta){
        this.idUsuario = idUsuario;
        this.nombreUsuario = nombreUsuario;
        this.emailUsuario = emailUsuario;
        this.passwordUsuario = passwordUsuario;
        this.fechaAlta = fechaAlta;
       // this.repeatpasswordUsuario = passwordUsuario;
    }
}