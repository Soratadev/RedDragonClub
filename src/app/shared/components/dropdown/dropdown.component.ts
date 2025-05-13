import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from '../../services/user.service';
import {combineLatest} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent implements OnInit {
  isOpen = false;
  selectedOption: string | null = null;
  options: string[] = [];
  readonly #router = inject(Router);

  readonly #userService = inject(UserService);
  isLogged = false;
  isAdmin = false;

  ngOnInit() {
    combineLatest([
      this.#userService.getLoginStatus$(),
      this.#userService.getUserRole$()
    ]).subscribe(([isLogged, role]) => {
      this.isLogged = isLogged;
      this.isAdmin = role === 'ROLE_ADMIN';

      // Actualiza las opciones dinámicamente
      this.options = this.isAdmin
        ? ['Add new BG', 'Edit', 'Delete']
        : isLogged
          ? ['Profile', 'Booking']
          : []; // Si no está logueado, no hay opciones
    });
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;

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
