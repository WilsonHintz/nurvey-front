import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
//import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { NguiMapModule} from '@ngui/map';


import { DashboardComponent }   from './dashboard/dashboard.component';
import { FiltrodashComponent } from './dashboard/filtrodash.component';
import { GraficoPreguntaComponent } from './dashboard/graficoPregunta.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { SurveyService } from './shared/services/survey.service';
import { ResultadoService } from './shared/services/resultados.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SurveyEditorComponent } from './surveyEditor/survey.editor.component';
import { misEncuestasComponent } from './misencuestas/misencuestas.component';
import { respuestaComponent } from './respuesta/respuesta.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
//import { customHttpProvider } from './shared/helpers/index';
import { AlertComponent } from './shared/directives/index';
import { AuthGuard } from './shared/guards/index';
import { AlertService, AuthenticationService, UserService } from './shared/services/index';
import { HomeComponent } from './home/index';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    LoginComponent,
    RegisterComponent,
    SurveyEditorComponent,
    misEncuestasComponent,
    respuestaComponent,
    HomeComponent,
    AlertComponent,
    FiltrodashComponent,
    GraficoPreguntaComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    //FooterModule,
    HttpModule,
    NgIdleKeepaliveModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBr-tgUtpm8cyjYVQDrjs8YpZH7zBNWPuY'})

  ],
  providers: [
    SurveyService,
    //customHttpProvider,
    ResultadoService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
