import { Component, OnInit } from '@angular/core';
import 'jquery';
import 'bootstrap';
import { UserService } from './shared/services/index';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{ 

  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private userService: UserService){
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
