import {Component, inject, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {UserService} from '../../services/user.service';
import {combineLatest, Subscription} from 'rxjs';
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
  isAdmin = false;
  username: string | null = null;


  ngOnInit() {
    this.subscription.add(
      combineLatest([
        this.#userService.getLoginStatus$(),
        this.#userService.getUsername$(),
        this.#userService.getUserRole$()
      ]).subscribe(([isLogged, username, role]) => {
        this.isLogged = isLogged;
        this.username = username;
        this.isAdmin = role === 'ROLE_ADMIN';
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isLogged']) {
      console.log('isLogged has changed', changes['isLogged'].currentValue);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onButtonClick(): void {
    if (this.isLogged) {
      // if log in, log out
      this.#userService.logout(); // delete token in localStorage
      this.#router.navigate(['/home']);
    } else {
      this.#router.navigate(['/auth/login']);
    }
  }

  onUsernameClick(): void {
    this.#router.navigate(['/auth/dashboard']); // go to Dashboard
  }

}
