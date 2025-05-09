import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  readonly #formBuilder = inject(FormBuilder);
  readonly #router = inject(Router);
  message: string = '';

  loginForm: FormGroup = this.#formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  goSubmit() {
    if (this.loginForm.valid) {
      // Aquí iría la lógica de login
      console.log(this.loginForm.value);
    } else {
      this.message = 'Please fill in all required fields correctly.';
    }
  }

  goToResetPassword() {
    this.#router.navigate(['auth/reset-password']);
  }
}
