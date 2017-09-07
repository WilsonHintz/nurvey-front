import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
// import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgaModule } from '../../theme/nga.module';

import { Login } from './login.component';


@NgModule({
  imports: [
    CommonModule,
   // AppTranslationModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    Login
  ]
})
export class LoginModule {}
