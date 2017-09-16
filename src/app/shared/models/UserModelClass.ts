export class UserModelClass{
    idUsuario: number;
    nombreUsuario: string;
    emailUsuario: string;
    passwordUsuario: string;
    //repeatpasswordUsuario: string;
    
    constructor(idUsuario,nombreUsuario,emailUsuario,passwordUsuario){
        this.idUsuario = idUsuario;
        this.nombreUsuario = nombreUsuario;
        this.emailUsuario = emailUsuario;
        this.passwordUsuario = passwordUsuario;
       // this.repeatpasswordUsuario = passwordUsuario;
    }
}