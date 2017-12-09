import { Component, OnInit } from '@angular/core';
import { UserModelClass } from './shared/models/UserModelClass';

import 'jquery';
import 'bootstrap';
import { UserService } from './shared/services/index';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public currentUser: UserModelClass;
  public isLogged: boolean;

  ngOnInit() {
    console.log("ngOnInit_appComponent")
  }

  mostrarMenu(nombreUsuario: string):void{
    alert(nombreUsuario);
}

 }
