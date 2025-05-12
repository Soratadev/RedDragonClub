import { Routes } from '@angular/router';
import {bgIdResolver} from './shared/resolvers/bgId.resolver';

export const routes: Routes = [
  {
    path: 'home', loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'catalog', loadComponent: () => import('./pages/bg/bg-catalog/bg-catalog.component').then(c => c.BgCatalogComponent)
  },
  {
    path: 'bg',
    children: [
      {
        path: 'new', loadComponent: () => import('./pages/bg/bg-new/bg-new.component').then(c => c.BgNewComponent)
      },
      {
        path: 'book/:id', loadComponent: () => import('./pages/bg/bg-booking/bg-booking.component').then(c => c.BgBookingComponent),
        resolve: { bg: bgIdResolver },
      },
      {
        path: 'update/:id', loadComponent: () => import('./pages/bg/bg-update/bg-update.component').then(c => c.BgUpdateComponent),
        resolve: { bg: bgIdResolver },
      }
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login', loadComponent: () => import('./pages/auth/login/login.component').then(c => c.LoginComponent)
      },
      {
        path: 'register', loadComponent: () => import('./pages/auth/register/register.component').then(c => c.RegisterComponent)
      }
    ]
  },
  /*{
    path: 'dashboard', loadComponent: () => import('./pages/auth/dashboard/dashboard.component').then(c => c.DashboardComponent),
    canActivate: [UserGuard]
  },*/
  {
    path: '**', redirectTo: 'home', pathMatch: 'full'
  }
];
