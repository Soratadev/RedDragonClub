import {Component, inject, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
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
export class HeaderComponent implements OnInit, OnChanges, OnDestroy{
  readonly #router = inject(Router);
  readonly #userService = inject(UserService);
  private subscription = new Subscription();

  isLogged = false;
  isAdmin = false;
  username: string | null = null;

  isDropdownOpen = false;
  dropdownOptions: string[] = [];



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

        this.dropdownOptions = this.isAdmin
          ? ['Profiles', 'Add new BG', 'Manage BG']
          : [];
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
  // Manejar clic en el botón del nombre de usuario
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Manejar selección de opción desde el dropdown
  onDropdownOptionSelected(option: string): void {
    this.isDropdownOpen = false;

    switch (option) {
      case 'Add new BG':
        this.#router.navigate(['/bg/new']);
        break;
      case 'Edit':
        this.#router.navigate(['/bg/edit']);
        break;
      case 'Delete':
        this.#router.navigate(['/bg/delete']);
        break;
      case 'Profile':
        this.#router.navigate(['/auth/dashboard']);
        break;
      case 'Booking':
        this.#router.navigate(['/bg/book']);
        break;
      default:
        console.log('Unknown option:', option);
    }
  }
}
