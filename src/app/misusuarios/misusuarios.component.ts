import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router'

import { UserService } from './../shared/services/user.service';
import { UserModelClass } from '../shared/models/UserModelClass';



@Component({
    selector: 'misUsuarios',
    templateUrl: './misusuarios.component.html',
    styleUrls: ['./misusuarios.component.css']
})
export class misUsuariosComponent implements OnInit {
    userService: UserService;
    users: UserModelClass[] = [];
    usersFiltrados: UserModelClass[] = [];

    constructor(userService: UserService, private router: Router){
        this.userService = userService
    }

    /** 
     * Inicializacion de pantalla: 
     * Carga de encuestas por usuario  
     * Seteo de encuesta como NO SELECCIONADA 
     */ 
    ngOnInit() { 
        this.loadUsuarios(); 
        
    } 

    /** 
     * Cargar encuestas por usuarios 
     */ 
    loadUsuarios(){ 
        this.userService.getAll().subscribe(users => { 
            this.users = users;
            this.usersFiltrados = users;                    
        });
    }     

    buscarUsuarios(){
        this.usersFiltrados = [];
        this.users.forEach(user => {
            var busqueda = $("#nombre").val().toString().toLowerCase();
            if(user.nombreUsuario.toLowerCase().includes(busqueda)){
                this.usersFiltrados.push(user);
            }
        });
        
    }
    
}