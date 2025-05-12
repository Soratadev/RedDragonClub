import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from '../services/user.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  readonly #userService = inject(UserService)

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.#userService.getToken();
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    }
    // Si no hay token, enviamos la petición original
    return next.handle(req);
  }
}

// Proveedor para registro en main.ts
export const TOKEN_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
};
