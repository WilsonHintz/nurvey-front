import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms'; 
import { AlertService, AuthenticationService } from '../shared/services/index';
 
@Component({
    selector: 'login',
    moduleId: module.id,
    templateUrl: 'login.html',
    styleUrls: ['./login.css']

})
 
export class LoginComponent implements OnInit {
    public form:FormGroup;
    public email:AbstractControl;
    public password:AbstractControl;
    public submitted:boolean = false;
    model: any = {};
    loading = false;
    returnUrl: string;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        fb:FormBuilder) 
        {
          this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
          });
      
          this.email = this.form.controls['email'];
          this.password = this.form.controls['password'];
          this.router = this.router;
          this.route = this.route;
          this.authenticationService = this.authenticationService;
          this.alertService = this.alertService;
         }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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