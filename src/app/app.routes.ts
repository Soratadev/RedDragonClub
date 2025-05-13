import { Routes } from '@angular/router';
import {bgIdResolver} from './shared/resolvers/bgId.resolver';
import {UserGuard} from './shared/resolvers/user.guard';

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
      },
      {
        path: 'profiles', loadComponent: () => import('./pages/auth/profiles/profiles.component').then(c => c.ProfilesComponent),
        canActivate: [UserGuard]
      },
      {
        path: 'manage-bg', loadComponent: () => import('./pages/auth/manage-bg/manage-bg.component').then(c => c.ManageBgComponent),
        canActivate: [UserGuard]
      }
    ]
  },

  {
    path: '**', redirectTo: 'home', pathMatch: 'full'
  }
];
