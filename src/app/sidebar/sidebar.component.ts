import { Component, OnInit } from '@angular/core';
import {GlobalState} from '../global.state';
import { AuthenticationService } from '../shared/services/authentication.service';
import { UserService } from '../shared/services/index';

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [

    { path: 'home', title: 'Home',  icon:'ti-desktop', class: '' },
    { path: 'dashboard', title: 'Estadisticas',  icon: 'ti-panel', class: '' },
    { path: 'user', title: 'Perfil del Usuario',  icon:'ti-user', class: '' },
   // { path: 'table', title: 'Table List',  icon:'ti-view-list-alt', class: '' },
   // { path: 'typography', title: 'Typography',  icon:'ti-text', class: '' },
   // { path: 'icons', title: 'Icons',  icon:'ti-pencil-alt2', class: '' },
   // { path: 'maps', title: 'Maps',  icon:'ti-map', class: '' },
   // { path: 'notifications', title: 'Notifications',  icon:'ti-bell', class: '' },
    { path: 'misEncuestas', title: 'Mis Encuestas',  icon:'ti-files', class: '' },
    { path: 'editor', title: 'Editor',  icon:'ti-pencil-alt', class: '' },
    { path: 'misUsuarios', title: 'Usuarios',  icon:'ti-list', class: '' },
   // { path: 'login', title: 'Iniciar Sesión',  icon:'ti-user', class: '' },
    // { path: 'register', title: 'Registro',  icon:'ti-user', class: '' },
   // { path: 'home', title: 'Home',  icon:'ti-desktop', class: '' },
];

export const ROUTESADM: RouteInfo[] = [

    { path: 'home', title: 'Home',  icon:'ti-desktop', class: '' }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public isScrolled:boolean = false;
    public isMenuCollapsed:boolean = false;
    public authenticationService: AuthenticationService;
    currentUser = JSON.parse(localStorage.getItem('currentUser'));

    constructor(authenticationService: AuthenticationService,
        private userService: UserService) {
        this.authenticationService=authenticationService;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      }

    ngOnInit() {
        this.esUsuario();
       // this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    esUsuario(){
        if (this.currentUser.idUsuario !=0)
        {
            if (this.currentUser.nombreUsuario == "Administrador")
            {
                this.menuItems = ROUTESADM.filter(menuItem => menuItem);
            }
            else
            {
                this.menuItems = ROUTES.filter(menuItem => menuItem);
            }
        }
        else
        {
            this.menuItems;
        }
    }

    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }



    
    
    //   public toggleMenu() {
    //     this.isMenuCollapsed = !this.isMenuCollapsed;
    //     this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    //     return false;
    //   }
    
    //   public scrolledChanged(isScrolled) {
    //     this.isScrolled = isScrolled;
    //   }

}
