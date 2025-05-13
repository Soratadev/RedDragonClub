import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {User} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly #http = inject(HttpClient);
  private apiUrl = 'http://localhost/public/index.php/';
  private loginStatus$ = new BehaviorSubject<boolean>(this.isLogged());
  private username$ = new BehaviorSubject<string | null>(this.getStoredUsername());
  private userRole$ = new BehaviorSubject<string | null>(this.getStoredUserRole());



  register(user: User ): Observable<any> {
    return this.#http.post(this.apiUrl + 'auth/register', user);
  }
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.#http.post<any>(this.apiUrl + 'auth/login', credentials)
      .pipe(
        tap(res => {
          localStorage.setItem('jwt_token', res.token);
          localStorage.setItem('name', res.name);
          localStorage.setItem('role', res.role);
          this.refreshStateFromLocalStorage();
        })
      );
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('name');
    this.refreshStateFromLocalStorage();
  }

  isLogged(): boolean {
    return localStorage.getItem('jwt_token') !== null;
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  getUsername$(): BehaviorSubject<string | null> {
    return this.username$;
  }

  getStoredUsername(): string | null {
    return localStorage.getItem('name');
  }

  getLoginStatus$(): BehaviorSubject<boolean> {
    return this.loginStatus$;
  }

  setLoginStatus(status: boolean): void {
    this.loginStatus$.next(status);
  }

  // Observables para el rol
  getUserRole$(): BehaviorSubject<string | null> {
    return this.userRole$;
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  private getStoredUserRole(): string | null {
    return localStorage.getItem('role');
  }

  refreshStateFromLocalStorage(): void {
    const token = this.getToken();
    const username = this.getStoredUsername();
    const role = this.getStoredUserRole();

    this.loginStatus$.next(!!token);
    this.username$.next(username);
    this.userRole$.next(role);
  }



















}
