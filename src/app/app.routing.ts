import { Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { misEncuestasComponent } from './misencuestas/misencuestas.component';
import { misUsuariosComponent } from './misusuarios/misusuarios.component';
import { respuestaComponent } from './respuesta/respuesta.component';
import { SurveyEditorComponent } from './surveyEditor/survey.editor.component';
import { HomeComponent } from './home/index';
import { AuthGuard } from './shared/guards/index';
import { PasswordComponent } from './password/password.component';

export const AppRoutes: Routes = [
    
    { 
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    { path: 'home', component: HomeComponent,
     canActivate: [AuthGuard] 
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]  
    },
    {
        path: 'password',
        component: PasswordComponent,
        canActivate: [AuthGuard]  
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'table',
        component: TableComponent
    },
    {
        path: 'typography',
        component: TypographyComponent
    },
    {
        path: 'icons',
        component: IconsComponent
    },
    {
        path: 'maps',
        component: MapsComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'editor/:id',
        component: SurveyEditorComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'editor',
        component: SurveyEditorComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'misEncuestas',
        component: misEncuestasComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'respuesta/:id',
        component: respuestaComponent
    },
    {
        path: 'misUsuarios',
        component: misUsuariosComponent,
        canActivate: [AuthGuard] 
    }

]
