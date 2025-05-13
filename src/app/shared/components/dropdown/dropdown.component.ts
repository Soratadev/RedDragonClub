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
        ? ['Profiles', 'Add new BG', 'Manage BG']
        : []; // Si no está logueado, estará vacío
    });
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;

    switch (option) {
      case 'Profiles':
        this.#router.navigate(['/auth/profiles']);
        break;
      case 'Add new BG':
        this.#router.navigate(['/bg/new']);
        break;
      case 'Manage BG':
        this.#router.navigate(['/auth/manage-bg']);
        break;
      default:
        console.log('Unknown option:', option);
    }
  }
}
