import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { UserModelClass } from '../shared/models/UserModelClass';
import { UserService } from '../shared/services/index';

@Component({
    selector: 'home',
    //moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    currentUser: UserModelClass;
    users: UserModelClass[] = [];
    @Output() PasameElPueblo = new EventEmitter();

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.PasameElPueblo.emit({usuario: this.currentUser});
        
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(idUsuario: string) {
        this.userService.delete(idUsuario).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}