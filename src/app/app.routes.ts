import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
];
