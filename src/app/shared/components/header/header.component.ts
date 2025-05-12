import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Subscription} from 'rxjs';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy{
  readonly #router = inject(Router);
  readonly #userService = inject(UserService);
  private subscription = new Subscription();

  isLogged = false;
  username: string | null = null;


  ngOnInit() {
    this.subscription.add(
      this.#userService.getLoginStatus$().subscribe((status) => {
        this.isLogged = status;
      })
    );
    this.subscription.add(
      this.#userService.getUsername$().subscribe(name => {
        this.username = name;
      })
    );

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onButtonClick(): void {
    if (this.isLogged) {
      // Si está logueado, cerrar sesión
      this.#userService.logout(); // Elimina token de localStorage
      this.#router.navigate(['/home']);
    } else {
      this.#router.navigate(['/auth/login']);
    }
  }

  onUsernameClick(): void {
    this.#router.navigate(['/auth/dashboard']); // Redirigir al Dashboard
  }

}
