import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {UserService} from '../services/user.service';


@Injectable({ providedIn: 'root' })
export class UserGuard implements CanActivate {
  readonly #userService = inject(UserService);
  readonly #router = inject(Router);

  canActivate(): boolean {
    // Si el token existe → ruta permitida
    if (this.#userService.isLogged()) {
      return true
    }
    // Si no está logueado → redirigir a login
    this.#router.navigate(['/auth/login']);
    return false;
  }
}
