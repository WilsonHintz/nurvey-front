﻿import { Component, OnInit } from '@angular/core';

import { UserModelClass } from '../shared/models/UserModelClass';
import { UserService } from '../shared/services/index';

@Component({
    selector: 'home',
    //moduleId: module.id,
    //templateUrl: 'home.component.html'
    template: `<h2>Usuario creado exitosamente!</h2>`
})

export class HomeComponent {
    // currentUser: UserModelClass;
    // users: UserModelClass[] = [];

    // constructor(private userService: UserService) {
    //     this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // }

    // ngOnInit() {
    //     this.loadAllUsers();
    // }

    // deleteUser(idUsuario: string) {
    //     this.userService.delete(idUsuario).subscribe(() => { this.loadAllUsers() });
    // }

    // private loadAllUsers() {
    //     this.userService.getAll().subscribe(users => { this.users = users; });
    // }
}