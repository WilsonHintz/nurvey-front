import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from './validators'; 
import { AlertService, UserService } from '../shared/services/index';
 
@Component({
    selector: 'register',
    moduleId: module.id,
    templateUrl: 'register.html'
})
 
export class RegisterComponent {
    // public form:FormGroup;
    // public nombreUsuario:AbstractControl;
    // public email:AbstractControl;
    // public password:AbstractControl;
    // public repeatPassword:AbstractControl;
    // public passwords:FormGroup;

    model: any = {};
    loading = false;
 
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) 
        {
          // this.form = fb.group({
          //   'nombreUsuario': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
          //   'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
          //   'passwords': fb.group({
          //     'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
          //     'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
          //   }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
          // });
      
          // this.nombreUsuario = this.form.controls['nombreUsuario'];
          // this.email = this.form.controls['email'];
          // this.passwords = <FormGroup> this.form.controls['passwords'];
          // this.password = this.passwords.controls['password'];
          // this.repeatPassword = this.passwords.controls['repeatPassword'];
          // this.router = this.router;
          // this.userService = this.userService;
          // this.alertService = this.alertService;
         }

 
    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}

/*
import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from './validators';


@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})

export class RegisterComponent {

  public form:FormGroup;
  public nombreUsuario:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;

  public submitted:boolean = false;

  constructor(fb:FormBuilder) {

    this.form = fb.group({
      'nombreUsuario': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.nombreUsuario = this.form.controls['nombreUsuario'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
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