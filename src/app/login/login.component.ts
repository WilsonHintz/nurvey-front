import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms'; 
import { AlertService, AuthenticationService } from '../shared/services/index';
import {EmailValidator} from '../register/validators';
import {Http, Headers} from "@angular/http";
import {NgClass} from '@angular/common';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx'; 
 
@Component({
    selector: 'login',
    //moduleId: module.id,
    templateUrl: 'login.html',
    styleUrls: ['./login.css']

})
 
export class LoginComponent implements OnInit {
    public form:FormGroup;
    public email:AbstractControl;
    public password:AbstractControl;

    nome :any = localStorage['app-appHeader'];
    model: any = {};
    loading = false;
    returnUrl: string;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private idle: Idle,
        private http: Http,
        fb:FormBuilder) 
        {
          this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
          });
      
          this.email = this.form.controls['email'];
          this.password = this.form.controls['password'];

          idle.setIdle(10);
          idle.setTimeout(1800);
          idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
  
          // idle.onTimeoutWarning.subscribe((countdown: number) => {
          //     alert('Timeout Warning - ' + countdown);
          // });
  
          idle.onTimeout.subscribe(() => {

            localStorage.clear();
  
            this.router.navigate(['/login', {sessionExpirate: 'true'}]);
          });
  
          idle.watch();
         }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.emailUsuario, this.model.passwordUsuario)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}


/*
import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      // console.log(values);
    }
  }
}



*/