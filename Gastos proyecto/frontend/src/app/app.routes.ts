import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome.component').then(m => m.WelcomeComponent)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];