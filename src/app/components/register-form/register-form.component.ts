import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  readonly #formBuilder = inject(FormBuilder);
  readonly #router = inject(Router);
  readonly #userService = inject(UserService);
  message: string = '';

  registerForm: FormGroup = this.#formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    birthdate: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  goSubmit() {
    if (this.registerForm.valid) {
      this.#userService.register(this.registerForm.value).subscribe({
        next: () => this.#router.navigate(['/auth/login']),
        error: err => console.error('Failed to register', err)
      });

      console.log(this.registerForm.value);
    } else {
      this.message = 'please fill in all required fields and password must be at least 6 characters long.';
    }
  }

  goToLogin() {
    this.#router.navigate(['auth/login']);
  }



}
