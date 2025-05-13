import {Component, inject, OnInit} from '@angular/core';
import {User} from '../../../shared/interfaces/user.interface';
import {UserService} from '../../../shared/services/user.service';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-profiles',
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './profiles.component.html',
})
export class ProfilesComponent implements OnInit {
  readonly #userService = inject(UserService);

  users: User[] = [];
  isEditing: boolean = false;
  editedUser: Partial<User> | null = null;

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.#userService.getUsers().subscribe({
      next:(response: User[]) => {
        this.users = response;
      },
      error: (error: any) => {
        console.error('Failed to load users:', error);
        this.users = [];
      }
    });
  }

  editUser(user: User): void {
    this.isEditing = true;
    this.editedUser = { ...user }; // Crea una copia editable del usuario
  }

  onInputChange(event: Event, field: keyof User): void {
    const inputElement = event.target as HTMLInputElement; // Captura del campo editado
    if (this.editedUser) {
      (this.editedUser as any)[field] = inputElement.value; // Actualizamos la propiedad específica
    }
  }

  // guardar cambios del usuario
  saveUser(): void {
    if (this.editedUser) {
      this.#userService.updateUser(this.editedUser as User).subscribe({
        next: () => {
          console.log('User updated successfully');
          this.isEditing = false;
          this.editedUser = null;
          this.loadUsers(); // Recarga la lista de usuarios
        },
        error: (error: any) => {
          console.error('Failed to update user:', error);
        },
      });
    }
  }

  // cancelar la edición
  cancelEdit(): void {
    this.isEditing = false;
    this.editedUser = null;
  }

  // eliminar un usuario
  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.#userService.deleteUser(userId).subscribe({
        next: () => {
          console.log('User deleted successfully');
          this.loadUsers();
        },
        error: (error: any) => {
          console.error('Failed to delete user:', error);
        },
      });
    }
  }





}
