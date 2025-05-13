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
          localStorage.setItem('username', res.username);
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
    return localStorage.getItem('username');
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

  updateUser(edited_user: User): Observable<any> {
    const updateData = {
      id: edited_user.id,
      username: edited_user.username,
      email: edited_user.email,
      birthdate: edited_user.birthdate,
      isAdmin: edited_user.isAdmin,
    };
    return this.#http.put(this.apiUrl + 'auth/user/edit/'+edited_user.id+'', updateData).pipe(
      tap(() =>{
        this.refreshStateFromLocalStorage();
      })
    )
  }
  getUserById(id: number): Observable<User> {
    return this.#http.get<User>(this.apiUrl + 'auth/user/'+id+'');
  }
  getUsers(): Observable<User[]> {
    return this.#http.get<User[]>(this.apiUrl + 'auth/user');
  }

  deleteUser(id: number): Observable<User>{
    return this.#http.delete<User>(this.apiUrl + 'auth/user/delete/'+id+'').pipe(
      tap(() => {
        this.refreshStateFromLocalStorage();
      })
    )
  }



















}
