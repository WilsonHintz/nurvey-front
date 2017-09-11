export class UserModelClass{
    idUsuario: number;
    nombreUsuario: string;
    email: string;
    password: string;
    repeatPassword: string;
    
    constructor(idUsuario,nombreUsuario,emailUsuario,password,repeatPassword){
        this.idUsuario = idUsuario;
        this.nombreUsuario = nombreUsuario;
        this.email = emailUsuario;
        this.password = password;
        this.repeatPassword = password;
    }
}