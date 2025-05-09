import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  readonly #formBuilder = inject(FormBuilder);
  readonly #router = inject(Router);
  message: string = '';

  registerForm: FormGroup = this.#formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    birthDate: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  goSubmit() {
    if (this.registerForm.valid) {
      // Aquí iría la lógica de registro
      console.log(this.registerForm.value);
    } else {
      this.message = 'please fill in all required fields and password must be at least 6 characters long.';
    }
  }

  goToLogin() {
    this.#router.navigate(['auth/login']);
  }



}
