import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  readonly #userService = inject(UserService);
  readonly #formBuilder = inject(FormBuilder);
  readonly #router = inject(Router);
  message: string = '';

  loginForm: FormGroup = this.#formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  goSubmit() {
    if (this.loginForm.valid) {
      if (this.loginForm.invalid) return;
      this.#userService.login(this.loginForm.value).subscribe({
        next: () => this.#router.navigate(['/dashboard']),
        error: (err: any) => console.error('Credentials incorrect!', err)
      });
    } else {
      this.message = 'Please fill in all required fields correctly.';
    }
  }

  goToResetPassword() {
    this.#router.navigate(['auth/reset-password']);
  }
}
