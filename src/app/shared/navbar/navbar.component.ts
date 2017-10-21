import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service'
import { UserModelClass } from '../models/UserModelClass';
import { UserService } from '../services/index';

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
    styleUrls: ['./navbar.css']
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;
    currentUser: any;
    public authenticationService: AuthenticationService;
    model: any = {};

    @ViewChild("navbar-cmp") button;

    constructor(location:Location,
        private renderer : Renderer, 
        private element : ElementRef, 
        private userService: UserService, 
        authenticationService: AuthenticationService)
        {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.authenticationService = authenticationService;
        //this.model = this.currentUser;
    }

    ngOnInit(){
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    getTitle(){
        var titlee = window.location.pathname;
        titlee = titlee.substring(1);
        for(var item = 0; item < this.listTitles.length; item++){
            if(this.listTitles[item].path === titlee){
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

    login() {
        
    this.authenticationService.login(this.currentUser.emailUsuario, this.currentUser.passwordUsuario)
    }

    salir(){
        this.authenticationService.logout();
      }


    sidebarToggle(){
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];

        if(this.sidebarVisible == false){
            setTimeout(function(){
                toggleButton.classList.add('toggled');
            },500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
}
