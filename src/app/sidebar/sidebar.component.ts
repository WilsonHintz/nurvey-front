import { Component, OnInit } from '@angular/core';
import {GlobalState} from '../global.state';

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
   // { path: 'login', title: 'Iniciar Sesión',  icon:'ti-user', class: '' },
    // { path: 'register', title: 'Registro',  icon:'ti-user', class: '' },
   // { path: 'home', title: 'Home',  icon:'ti-desktop', class: '' },
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


    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }

    // constructor(private _state:GlobalState) {
    //     this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
    //       this.isMenuCollapsed = isCollapsed;
    //     });
    //   }
    
    //   public toggleMenu() {
    //     this.isMenuCollapsed = !this.isMenuCollapsed;
    //     this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    //     return false;
    //   }
    
    //   public scrolledChanged(isScrolled) {
    //     this.isScrolled = isScrolled;
    //   }

}
